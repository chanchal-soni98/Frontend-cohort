import React, { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const FakeStore = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [viewType, setViewType] = useState("grid"); 
  const [sortOrder, setSortOrder] = useState("none"); 

  const debouncedSearch = useDebounce(searchItem, 500);

  const fetchData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setDisplayedProducts(data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Filter with debounce
  useEffect(() => {
    let filtered = [...products];
    if (debouncedSearch.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // ✅ Sort by price
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filtered);
  }, [debouncedSearch, sortOrder, products]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Fake Store</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />

      {/* 🔁 Sort and View Toggle */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setSortOrder("asc")} style={{ marginRight: "5px" }}>
          Sort Price ⬆️
        </button>
        <button onClick={() => setSortOrder("desc")} style={{ marginRight: "5px" }}>
          Sort Price ⬇️
        </button>
        <button onClick={() => setSortOrder("none")}>Reset Sort</button>
        <span style={{ margin: "0 15px" }}>|</span>
        <button onClick={() => setViewType("grid")} style={{ marginRight: "5px" }}>
          Grid View 🔲
        </button>
        <button onClick={() => setViewType("flex")}>Flex View 📃</button>
      </div>

      {/* 🖼️ Product Cards */}
      <div
        style={{
          display: viewType === "grid" ? "grid" : "flex",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        {displayedProducts.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              width: "200px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h4 style={{ fontSize: "14px" }}>{p.title}</h4>
            <p><strong>₹ {p.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeStore;
