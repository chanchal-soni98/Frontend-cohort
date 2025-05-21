import products from "./data/product";
import "./App.css";
import { useEffect, useState } from "react";


function App() {
  const [product, setProduct] = useState("");
  const [data, setData] = useState(products);
  const [debounce, setDebounce] = useState("");
  const [dropDown, setDropDown] = useState([]);
  const [manufactuer, setManufacture] = useState('')

  const handleRealTime = (e) => {
    const input = e.target.value;
    setProduct(input);
    const realTimeData = products.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setData(realTimeData);

    const dropDownData = realTimeData.map((item) => item.name);
    setDropDown(dropDownData);
  };

  const handleDebouceFilter = (e) => {
    const input = e.target.value;
    setDebounce(input);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const debouceData = products.filter((item) =>
        item.name.toLowerCase().includes(debounce.toLowerCase())
      );
      setData(debouceData);
      const dropDownData = debouceData.map((item) => item.name);
      setDropDown(dropDownData);
    }, 1000);

    return () => clearTimeout(delay);
  }, [debounce]);

  const handleNestedFilter = (e) => {
    const input = e.target.value;
    setManufacture(input);
    const filterData = products.filter((item) => item.manufacturer.name.toLowerCase().includes(input.toLowerCase()));
    setData(filterData);
  }
  
  
    useEffect(()=>{
      let lastTime = 0;
      const throttle = () =>{
        let now = Date.now();
        if(now-lastTime>=2000){
          console.log('scrolly', window.scrollY);
          lastTime = now;
        }
      }
      window.addEventListener('scroll',throttle);

      return () =>{window.removeEventListener('scroll', throttle)}
    })
    
  return (
    <>
      <div>
        Real Time Filter:{" "}
        <input
          style={{ padding: "6px" }}
          value={product}
          onChange={handleRealTime}
          placeholder="Real Time Product Search"
        />
      </div>
      <div style={{ margin: "8px" }}>
        Optimised Filter:{" "}
        <input
          style={{ padding: "6px" }}
          value={debounce}
          onChange={handleDebouceFilter}
          placeholder="Optimise Filter using debounce"
        />
      </div>
      <div style={{ margin: "8px" }}>Manufacturer Nested Filter<input style={{ padding: "6px" }} value={manufactuer} onChange={handleNestedFilter} placeholder="Nested Search Filter(manufactuer)"/></div>
      {(product.trim() !== "" || debounce.trim() !== "") &&
        dropDown.length > 0 && (
          <ol>
            {dropDown.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}
      <div style={{ display: "grid",  gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
        {data?.map((product) => (
          <div style={{ margin: "10px" }} key={product.id}>
            <p>Id: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.inStock ? "Available" : "Not available"}</p>
            <p>Manufacture: {product.manufacturer.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
