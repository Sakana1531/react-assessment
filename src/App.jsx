
import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const View = async (id) => {
    try {
      const response = await fetch("https://dummyjson.com/products/${id}");
      const data = await response.json();
      setSelectedProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Product Catalog</h1>

      {/* If product is selected, show its details */}
      {selectedProduct ? (
        <div>
          <h2>{selectedProduct.title}</h2>
          <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
          <p>Brand: {selectedProduct.brand}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>{selectedProduct.description}</p>
          <button onClick={() => setSelectedProduct()}></button>
        </div>
      ) : (
        products.map((item) => (
          <div key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Brand: {item.brand}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => View(item.id)}>View Details</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;























