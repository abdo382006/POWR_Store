// Custom Hooks
import useLocalStorage from "../../hooks/useLocalStorage";
// React Hooks
import { useState, useEffect, useContext } from "react";
// React Router Components & Hooks
import { Link, useNavigate } from "react-router-dom";
// React JSX Components
import PageLoader from "../PageLoader";
import ModalPopup from "../ModalPopup";
// Account Context
import { AccountContext } from "../App";
import { toast } from "react-toastify";

export default function Account() {
  const { get, remove } = useLocalStorage();
  const [ipInfo, setIpInfo] = useState({});
  const userGender = get("userData") ? get("userData").gender : "";
  const userData = get("userData");
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoggedIn } = useContext(AccountContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setIpInfo(data);
      });
  }, []);

  function logOut() {
    // Remove the user data from LS
    remove("userData");
    // Update the logged in state
    setIsLoggedIn(false);
    // Go to the home page
    navigateTo("/");
    // Show Toast Alert
    toast.error("You have logged out successfully!", {
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

  if (ipInfo.country_name) {
    return (
      <>
        <main className="account">
          <div className="container">
            <div className="header">
              <img
                src={
                  userGender === "Male"
                    ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png"
                    : "https://powrstore.netlify.app/images/avatar-female.jpg"
                }
                alt="User"
              />
              <div className="text">
                <h3>
                  {userData.firstName} {userData.lastName}
                </h3>
                <span>{ipInfo.country_name}</span>
              </div>
            </div>

            <h3 className="label">Options:-</h3>

            <div className="options">
              <Link to="/wishlist" className="box">
                <img src="src/assets/imgs/wishlist.png" alt="Wishlist" />
                <div className="text">
                  <h4>My Withlist</h4>
                  <p>
                    Explore your desires, curate dreams, and manifest
                    aspirations.
                  </p>
                </div>
              </Link>
              <Link to="/cart" className="box">
                <img src="src/assets/imgs/shopping-cart.png" alt="Cart" />
                <div className="text">
                  <h4>My Cart</h4>
                  <p>
                    Keep track of your chosen items before finalizing your
                    purchase.
                  </p>
                </div>
              </Link>
              <Link to="/store" className="box">
                <img src="src/assets/imgs/store.png" alt="Store" />
                <div className="text">
                  <h4>Our Store</h4>
                  <p>
                    Explore our collection, find what you love, and shop now.
                  </p>
                </div>
              </Link>
              <Link to="/faqs" className="box">
                <img src="src/assets/imgs/faq.png" alt="FAQs" />
                <div className="text">
                  <h4>Frequency Questions</h4>
                  <p>
                    Get answers to common inquiries and learn more about us.
                  </p>
                </div>
              </Link>
              <Link
                className="box"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              >
                <img src="src/assets/imgs/logout.png" alt="Lodout" />
                <div className="text">
                  <h4>Logout</h4>
                  <p>Sign out from your account for a secure session end.</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
        <ModalPopup
          isopen={isOpen}
          setIsOpen={setIsOpen}
          content="Do you realy want to logout?"
          workBtnContent="Logout"
          callbackFunction={logOut}
        />
      </>
    );
  } else {
    return <PageLoader />;
  }
}
