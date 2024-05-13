// React Router Components
import { Link, NavLink } from "react-router-dom";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
// React Hooks
import { useState, useContext } from "react";
// Account Context
import { AccountContext } from "./App";
// Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AccountContext);
  const { get } = useLocalStorage();
  const userGender = get("userData") ? get("userData").gender : "";

  return (
    <nav>
      <div className="container">
        <button className="menu-btn round-btn" onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <ul className={isOpen ? "links open" : "links"}>
          <li className="close-btn round-btn" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/store">Store</NavLink>
          </li>
          <li>
            <NavLink to="/faqs">FAQs</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
        </ul>

        {!isLoggedIn ? (
          <div className="buttons">
            <NavLink to="/signup" className="main-btn">
              <FontAwesomeIcon icon={faUserPlus} fixedWidth />
              Signup
            </NavLink>
          </div>
        ) : (
          <Link to="/account" title="My account" className="profile-link">
            <img
              src={
                userGender === "Male"
                  ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png"
                  : "https://powrstore.netlify.app/images/avatar-female.jpg"
              }
              alt="User"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
