// React Hooks
import { useContext } from "react";
// Products Context
import { ProductsContext } from "../App";
// React JSX Components
import ProductBox from "../ProductBox";
// React Router Hooks
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const { allProducts } = useContext(ProductsContext);

  const searchResultsArr = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="search-results">
      <div className="container">
        <div className="header">
          <h2>
            Search Results For: <span>{q}</span>
          </h2>
          <span>({searchResultsArr.length}) Results</span>
        </div>

        {searchResultsArr.length === 0 ? (
          <h3 className="empty-alert">No search results to show!</h3>
        ) : (
          <div className="products-grid">
            {searchResultsArr.map((p) => {
              return (
                <ProductBox
                  key={p.id}
                  id={p.id}
                  isAvailable={p.isAvailable}
                  img={p.img}
                  title={p.title}
                  category={p.category}
                  rate={p.rate}
                  discount={p.discount}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  sarPrice={p.sarPrice}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
