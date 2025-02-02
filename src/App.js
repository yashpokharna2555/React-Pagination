import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=10&skip=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }

    console.log(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((item) => {
            return <span>{item.title}</span>;
          })}
        </div>
      )}
    </div>
  );
}
