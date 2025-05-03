import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDebounce } from '../hook/useDebounce';

export const DataTable = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const handleSort = (accessor) => {
    if (!sortConfig || sortConfig.key !== accessor) {
      setSortConfig({ key: accessor, direction: 'asc' });
    } else {
      setSortConfig({
        key: accessor,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, data]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleConfirm = () => {
    alert('Confirmed!');
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Data Table</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '8px 12px', width: '200px', marginBottom: '20px' }}
      />
      <button onClick={() => setShowModal(true)}>Show Confirm Modal</button>
      {showModal && (
        <ConfirmModal
          title="Are you sure?"
          message="This action cannot be undone."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <label htmlFor="pageSize">Rows per page: </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
        </select>

        <table style={{ width: '70%', borderCollapse: 'collapse', textAlign: 'center', border: '1px solid black', margin: 'auto', marginTop: '50px' }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  style={{ border: '2px solid black', cursor: 'pointer' }}
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                >
                  {col.header}
                  {sortConfig?.key === col.accessor && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td style={{ border: '2px solid black' }} key={col.accessor}>
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center' }}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
      </div>
    </div>,
    document.body
  );
};
