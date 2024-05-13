// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// React JSX Elements
import SelectBox from "./SelectBox";
// React Hooks
import { useContext, useEffect } from "react";
// Contexts
import { CurrencyContext, ProductsContext } from "./App";
// React Toastify Library
import { toast } from "react-toastify";
// React Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";

export default function TopBar() {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const {
    allProducts,
    setAllProducts,
    savedProducts,
    setSavedProducts,
    cartProducts,
    setCartProducts,
  } = useContext(ProductsContext);
  const { store } = useLocalStorage();

  let API_Key = "bfdb0b5270-e72ff6d94b-sd3tly";

  useEffect(() => {
    if (currency) {
      fetchCurrencyData();
    }
  }, [currency]);

  function fetchCurrencyData() {
    fetch(`https://api.fastforex.io/fetch-all?api_key=${API_Key}&from=SAR`)
      .then((res) => res.json())
      .then((data) => {
        // Get Prices Diff
        let diff = data.results[currency];
        // Get Updated Products Arrays
        const updatedAllProducts = [...allProducts].map((p) => {
          return {
            ...p,
            price: (p.sarPrice * diff).toFixed(2),
            oldPrice: (p.sarOldPrice * diff).toFixed(2),
          };
        });
        const updatedSavedProducts = [...savedProducts].map((p) => {
          return {
            ...p,
            price: (p.sarPrice * diff).toFixed(2),
            oldPrice: (p.sarOldPrice * diff).toFixed(2),
          };
        });
        const updatedCartProducts = [...cartProducts].map((p) => {
          return {
            ...p,
            price: (p.sarPrice * diff).toFixed(2),
            oldPrice: (p.sarOldPrice * diff).toFixed(2),
          };
        });
        // Update States
        setAllProducts(updatedAllProducts);
        setSavedProducts(updatedSavedProducts);
        setCartProducts(updatedCartProducts);
      });
  }

  function changeCurrency(e) {
    // Update The Website Currency
    setCurrency(e.target.value);
    // Store Currency To LS
    store("currency", e.target.value);
    // Show Toast Alert
    toast.success("Currency changed successfully!", {
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

  return (
    <div className="top-bar">
      <div className="container">
        <div className="row">
          <p>Welcome to POWER Store ❤️!</p>
          <a href="https://wa.me/966555427712" target="_blank" title="Help">
            <FontAwesomeIcon icon={faWhatsapp} /> +966555427712
          </a>
        </div>

        <div className="currency">
          <span>Currency:</span>
          <SelectBox>
            <select value={currency} onChange={changeCurrency}>
              <option value="AED">AED</option>
              <option value="SAR">SAR</option>
              <option value="QAR">QAR</option>
              <option value="OMR">OMR</option>
              <option value="KWD">KWD</option>
              <option value="BHD">BHD</option>
              <option value="JOD">JOD</option>
              <option value="DZD">DZD</option>
              <option value="EGP">EGP</option>
              <option value="LYD">LYD</option>
              <option value="MAD">MAD</option>
              <option value="TND">TND</option>
              <option value="SDG">SDG</option>
              <option value="YER">YER</option>
              <option value="IQD">IQD</option>
              <option value="SYP">SYP</option>
              <option value="LBP">LBP</option>
            </select>
          </SelectBox>
        </div>
      </div>
    </div>
  );
}
