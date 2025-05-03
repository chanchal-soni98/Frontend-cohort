import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../ThemeContext';

export const ProductCard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [favs, setFavs] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  useEffect(() => {
    const existingFavs = JSON.parse(localStorage.getItem('ProductFavs')) || [];
    setFavs(existingFavs);
  }, []);

  const addData = (pro) => {
    const existingFavs = JSON.parse(localStorage.getItem('ProductFavs')) || [];
    const isProductExist = existingFavs.some((item) => item.id === pro.id);
    if (isProductExist) {
      alert('Already in favorites');
      return;
    }
    const newAdded = [...existingFavs, pro];
    localStorage.setItem('ProductFavs', JSON.stringify(newAdded));
    setFavs(newAdded);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [search, sortOrder, allProducts]);

  return (
    <div style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)', textAlign: 'center' , background: theme === 'dark' ? '#1a1a1a' : '#fff',
      color: theme === 'dark' ? '#f0f0f0' : '#000',}}>
      <button
        onClick={toggleTheme}
        style={{
          margin: '20px',
          padding: '8px 16px',
          backgroundColor: theme === 'dark' ? '#fff' : '#333',
          color: theme === 'dark' ? '#000' : '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Toggle Theme
      </button>
      <h2>Number of Favs: {favs.length}</h2>
      <input
        onChange={handleSearch}
        value={search}
        placeholder="Search Item"
        style={{
          padding: '8px 12px',
          marginBottom: '16px',
          width: '250px',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{
          padding: '8px 12px',
          marginLeft: '12px',
          marginBottom: '16px',
        }}
      >
        <option value="">Sort by Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            padding: '20px',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'left',
                width: '200px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <h2 style={{ fontSize: '18px', margin: '10px 0' }}>
                {product.title}
              </h2>
              <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <h4 style={{ color: '#555' }}>₹{product.price}</h4>
                <button
                  style={{ border: 'none', backgroundColor: 'white' }}
                  onClick={() => addData(product)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
