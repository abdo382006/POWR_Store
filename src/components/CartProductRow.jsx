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

export default function CartProductRow({
  id,
  img,
  title,
  category,
  price,
  quantity,
  cartProducts,
  setCartProducts,
}) {
  const [isRemoved, setIsRemoved] = useState(false);
  const { store, get, remove } = useLocalStorage();
  const { currency } = useContext(CurrencyContext);

  let productLink = `/store/${id}`;

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
          {currency} {(quantity * price).toFixed(2)}
        </span>
      </td>
      <td>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            // Store Quantity
            store(`product-${id}-quantity`, e.target.value);
            // Update Quantity
            setCartProducts((products) =>
              [...products].map((p) => {
                if (p.id == id) {
                  return { ...p, quantity: get(`product-${id}-quantity`) };
                } else {
                  return p;
                }
              })
            );
            // Store Cart Products
            store(
              "cartProducts",
              [...cartProducts].map((p) => {
                if (p.id == id) {
                  return { ...p, quantity: get(`product-${id}-quantity`) };
                } else {
                  return p;
                }
              })
            );
          }}
        />
      </td>
      <td>
        <button
          onClick={() => {
            // Update Removed State (Animation)
            setIsRemoved(true);
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
            // Wain unitl the animation ends
            setTimeout(() => {
              // Update The Cart Products State
              setCartProducts([...cartProducts].filter((p) => p.id !== id));
              // Store Cart Products In The LS
              store(
                "cartProducts",
                [...cartProducts].filter((p) => p.id !== id)
              );
              // Remove The Product Quantity
              remove(`product-${id}-quantity`);
            }, 500);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}
