// Font Awsome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// React Hooks
import { useContext } from "react";
// Products Context
import { ProductsContext } from "../App";
// React JSX Components
import SavedProductRow from "../SavedProductRow";

export default function Wishlist() {
  const { savedProducts, setSavedProducts } = useContext(ProductsContext);

  return (
    <main className="wishlist">
      <div className="container">
        <span className="icon">
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <h2 className="heading">My Wishlist</h2>
        {savedProducts.length === 0 ? (
          <h3 className="empty-alert">No saved products to show!</h3>
        ) : (
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Title</td>
                  <td>Category</td>
                  <td>Price</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {savedProducts.map((p) => {
                  return (
                    <SavedProductRow
                      key={p.id}
                      id={p.id}
                      img={p.img}
                      title={p.title}
                      category={p.category}
                      price={p.price}
                      savedProducts={savedProducts}
                      setSavedProducts={setSavedProducts}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
