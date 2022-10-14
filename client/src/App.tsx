import React from "react";
import data from "./mockdata";
import ProductCard from "./components/ProductCard";
function App() {
  return (
    <div>
      {data.map((data) => (
        <ProductCard
          nombre={data.name}
          imagen={data.imagen}
          precio={data.precio}
          rating={data.rating}
        />
      ))}
    </div>
  );
}

export default App;
