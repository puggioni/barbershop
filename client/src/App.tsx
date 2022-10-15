import React from "react";
import data from "./mockdata";
import ProductCard from "./components/ProductCard";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div>
      <NavBar />
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
