/* eslint-disable react/prop-types */
// React Router Components
import { Link } from "react-router-dom";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingBag,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// Create Hooks
import { useContext } from "react";
// Contexts
import { CurrencyContext, ProductsContext } from "./App";
// React Toastify Library
import { toast } from "react-toastify";
// React Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";

export default function ProductBox({
  id,
  isAvailable,
  img,
  title,
  category,
  rate,
  discount,
  price,
  oldPrice,
  sarPrice,
}) {
  const productPageLink = `/store/${id}`;
  const { currency } = useContext(CurrencyContext);
  const { savedProducts, setSavedProducts, cartProducts, setCartProducts } =
    useContext(ProductsContext);
  const { store, get, remove } = useLocalStorage();

  const isProductInWishlist = savedProducts.find(
    (p) => p.title === title && p.id == id
  );
  const isProductInCart = cartProducts.find(
    (p) => p.title === title && p.id == id
  );

  function addProductToWishlist() {
    if (isProductInWishlist) {
      // Update Saved Products State
      setSavedProducts([...savedProducts].filter((p) => p.id !== id));
      // Store Saved Products In The LS
      store(
        "savedProducts",
        [...savedProducts].filter((p) => p.id !== id)
      );
      // Show Toast Alert
      toast.error("Product removed from the wishlist successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      // Update Saved Products State
      setSavedProducts([
        ...savedProducts,
        { id, img, title, category, price, sarPrice },
      ]);
      // Store Saved Products In The LS
      store("savedProducts", [
        ...savedProducts,
        { id, img, title, category, price, sarPrice },
      ]);
      // Show Toast Alert
      toast.success("Product added to the wishlist successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  function addProductToCart() {
    if (isProductInCart) {
      // Update Cart Products State
      setCartProducts([...cartProducts].filter((p) => p.id !== id));
      // Store Cart Products In The LS
      store(
        "cartProducts",
        [...cartProducts].filter((p) => p.id !== id)
      );
      // Remove The Product Quantity
      remove(`product-${id}-quantity`);
      // Show Toast Alert
      toast.error("Product removed from the cart successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      // Update Cart Products State
      setCartProducts([
        ...cartProducts,
        {
          id,
          img,
          title,
          category,
          price,
          sarPrice,
          quantity: 1,
        },
      ]);
      // Store Cart Products In The LS
      let quantity = get(`product-${id}-quantity`) || 1;
      store("cartProducts", [
        ...cartProducts,
        {
          id,
          img,
          title,
          category,
          price,
          sarPrice,
          quantity,
        },
      ]);
      // Show Toast Alert
      toast.success("Product added to the cart successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div className={isAvailable ? "product-box" : "product-box sold-out"}>
      {oldPrice != 0 && <span className="discount">-{discount}%</span>}
      <div className="options">
        <button
          className={isProductInWishlist ? "round-btn active" : "round-btn"}
          onClick={addProductToWishlist}
        >
          <FontAwesomeIcon icon={faHeart} fixedWidth />
        </button>
        <button
          className={isProductInCart ? "round-btn active" : "round-btn"}
          onClick={addProductToCart}
        >
          <FontAwesomeIcon icon={faShoppingBag} fixedWidth />
        </button>
      </div>
      <figure className="image-container">
        <Link to={productPageLink} title={title}>
          <img src={img} alt={title} />
        </Link>
      </figure>
      <div className="text">
        <span className="cat">{category}</span>
        <h4>
          <Link to={productPageLink} title={title}>
            {title}
          </Link>
        </h4>
        {GetStars(Math.round(rate))}
        <div className="price">
          <span className="new">
            {currency} {price}
          </span>
          {oldPrice != 0 && (
            <span className="old">
              {currency} {oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function GetStars(rate) {
  const stars = [];

  for (let i = 0; i < rate; i++) {
    stars.push(
      <li key={i}>
        <FontAwesomeIcon icon={faStar} />
      </li>
    );
  }

  return <ul className="stars">{stars}</ul>;
}
