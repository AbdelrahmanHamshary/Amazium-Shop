import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>My E-Commerce Store</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img
              src={p.image || "https://via.placeholder.com/200"}
              alt={p.name}
            />
            <h2>{p.name}</h2>
            <p>Price: ${p.price}</p>
            <p>{p.description}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;