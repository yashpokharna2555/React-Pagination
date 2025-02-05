import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch(
      "https://dummyjson.com/products?limit=100&skip=100"
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }

    console.log(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (pageNo) => {
    setPage(pageNo);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          {[...Array(Math.ceil(products.length / 10))].map((_, idx) => {
            return (
              <span
                className={page == idx + 1 ? "page__selected" : ""}
                onClick={() => selectPageHandler(idx + 1)}
                key={idx + 1}
              >
                {idx + 1}
              </span>
            );
          })}

          <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
        </div>
      )}
    </div>
  );
}
