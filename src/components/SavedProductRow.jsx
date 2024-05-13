/* eslint-disable react/prop-types */
// React Router Components
import { Link } from "react-router-dom";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
// React Hooks
import { useState, useContext } from "react";
// React Toastify Library
import { toast } from "react-toastify";
// React Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";
// Currency Context
import { CurrencyContext } from "./App";

export default function SavedProductRow({
  id,
  img,
  title,
  category,
  price,
  savedProducts,
  setSavedProducts,
}) {
  let productLink = `/store/${id}`;
  const [isRemoved, setIsRemoved] = useState(false);
  const { store } = useLocalStorage();
  const { currency } = useContext(CurrencyContext);

  return (
    <tr className={isRemoved ? "removed" : ""}>
      <td>
        <Link to={productLink} className="image-container">
          <img src={img} alt={title} />
        </Link>
      </td>
      <td>
        <Link to={productLink}>
          <h4>{title}</h4>
        </Link>
      </td>
      <td>
        <span>{category}</span>
      </td>
      <td>
        <span>
          {currency} {price}
        </span>
      </td>
      <td>
        <button
          onClick={() => {
            // Update Removed State (Animation)
            setIsRemoved(true);
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
            // Wain unitl the animation ends
            setTimeout(() => {
              // Update The Saved Products State
              setSavedProducts([...savedProducts].filter((p) => p.id !== id));
              // Store Saved Products In The LS
              store(
                "savedProducts",
                [...savedProducts].filter((p) => p.id !== id)
              );
            }, 500);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}
