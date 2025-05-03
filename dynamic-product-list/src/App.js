import React from "react";
import { ProductCard } from "./Component/ProductCard";
import { ThemeProvider } from "./ThemeContext";

function App() {
  
  return (
    <ThemeProvider>
      <ProductCard />
    </ThemeProvider>
  );
}

export default App;
