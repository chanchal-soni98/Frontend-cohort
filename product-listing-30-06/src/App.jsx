import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  
  const [allData, setAllData] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [searchProduct, setSearchProduct] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const [limit, setLimit] = useState(5);

  const [page, setPage] = useState(1);

  const url = "https://fakestoreapi.com/products";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchProduct(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);


  useEffect(() => {
    const searched = allData.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );

    const start = (page-1)*limit;
    const end = start + limit;

    setFilteredData(searched.slice(start, end));

  }, [allData, searchProduct, page, limit]);

  const totalPages = Math.ceil(
    allData.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    ).length / limit
  );

  const handleSelectChange = (e) => {
    setLimit(+e.target.value);
    setPage(1);
  };

  const handlePrevClick = () => {
    setPage((p) => p-1);
  };

  const handleNextClick = () => {
    setPage((p) => p+1);
  };

  return (
    <>
      <h1 className="bg-gray-200 text-3xl text-center font-bold p-4">
        Product Listing
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-4">
        <input
          className="border p-2 m-4"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search products..."
        />

        <select
          className="border p-2 m-4"
          onChange={handleSelectChange}
          value={limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">20</option>
        </select>

        {page > 1 && (
          <button className="p-2 border rounded" onClick={handlePrevClick}>
            Prev
          </button>
        )}

        {page < totalPages && (
          <button className="p-2 border rounded" onClick={handleNextClick}>
            Next
          </button>
        )}
      </div>

      <ul className="flex flex-wrap gap-4 p-8 m-auto justify-center">
        {filteredData.map((product) => (
          <li className="p-4 rounded w-72" key={product.id}>
            <img
              className="w-32 h-32 m-auto"
              src={product.image}
              alt={product.title}
            />
            <p>
              <span className="font-bold">Title:</span> {product.title}
            </p>
            <p>
              <span className="font-bold">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-bold">Price:</span> ${product.price}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
