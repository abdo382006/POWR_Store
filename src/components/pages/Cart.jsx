// Font Awsome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// React Hooks
import { useContext } from "react";
// Contexts
import { ProductsContext, CurrencyContext } from "../App";
// React JSX Components
import CartProductRow from "../CartProductRow";
// React Router Components
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartProducts, setCartProducts, subtotalPrice } =
    useContext(ProductsContext);
  const { currency } = useContext(CurrencyContext);

  return (
    <main className="cart">
      <div className="container">
        <span className="icon">
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
        <h2 className="heading">My Cart</h2>
        {cartProducts.length === 0 ? (
          <h3 className="empty-alert">No added products to show!</h3>
        ) : (
          <>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <td>Image</td>
                    <td>Title</td>
                    <td>Category</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((p) => {
                    return (
                      <CartProductRow
                        key={p.id}
                        id={p.id}
                        img={p.img}
                        title={p.title}
                        category={p.category}
                        price={p.price}
                        quantity={p.quantity}
                        cartProducts={cartProducts}
                        setCartProducts={setCartProducts}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="footer">
              <h3>
                Subtotal:{" "}
                <span>
                  {currency} {subtotalPrice.toFixed(2)}
                </span>
              </h3>
              <Link aria-disabled className="main-btn">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
