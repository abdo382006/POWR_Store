// Images
import logo from "../assets/imgs/logo.jpg";
// React Router Components & Hooks
import { Link, NavLink } from "react-router-dom";
// React JSX Components
import SearchBar from "./SearchBar";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
// React Hooks
import { useContext } from "react";
// Contexts
import { CurrencyContext, ProductsContext } from "./App";

export default function MainHeader() {
  const { currency } = useContext(CurrencyContext);
  const { cartProducts, subtotalPrice } = useContext(ProductsContext);

  return (
    <div className="main-header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="POWR eSports" />
        </Link>

        <SearchBar />

        <NavLink to="/cart" className="cart-btn">
          <span className="icon round-btn">
            <span>{cartProducts.length}</span>
            <FontAwesomeIcon icon={faShoppingBag} />
          </span>
          <p className="text">
            <span>My Cart:</span>
            <span className="subtotal-price">
              {currency} {subtotalPrice.toFixed(2)}
            </span>
          </p>
        </NavLink>
      </div>
    </div>
  );
}
