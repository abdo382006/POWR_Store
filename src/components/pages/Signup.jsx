/* eslint-disable no-useless-escape */
// Fonnt Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// React Router Components & Hooks
import { useNavigate } from "react-router-dom";
// React Hooks
import { useState, useReducer, useEffect, useContext } from "react";
// React Toastify Library
import { toast } from "react-toastify";
// Custom Hooks
import useLocalStorage from "../../hooks/useLocalStorage";
// Contexts
import { CurrencyContext, AccountContext } from "../App";
// React JSX Components
import SelectBox from "../SelectBox";

export default function Signup() {
  const [countryCode, setCountryCode] = useState("");
  const [userData, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Gender",
    password: "",
  });
  const [isShown, setIsShown] = useState(false);
  const { setIsLoggedIn } = useContext(AccountContext);
  const { store } = useLocalStorage();
  const navigateTo = useNavigate();
  const { setCurrency } = useContext(CurrencyContext);
  let [countryCurrency, setCountryCurrency] = useState("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setCountryCode(data.country_calling_code);
        setCountryCurrency(data.currency);
      });
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case "updateFirstName":
        return { ...state, firstName: action.value };
      case "updateLastName":
        return { ...state, lastName: action.value };
      case "updateEmail":
        return { ...state, email: action.value };
      case "updatePhone":
        return { ...state, phone: action.value };
      case "updateGender":
        return { ...state, gender: action.value };
      case "updatePassword":
        return { ...state, password: action.value };
      default:
        return state;
    }
  }

  function submitData(e) {
    // Prevent The Default
    e.preventDefault();
    // Set Regular Expression
    const nameRegex = /^[a-zA-Zأ-ي\s-_]+$/;
    const emailRegex = /^[\w-\.]+@[a-zA-Z0-9]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/;
    const phoneRegex = /^\d{10}$/;
    const genderRegex = /^Gender$/;
    const passwordRegex = /^[\w\W\s]{8,}$/;
    // Check Fields Validation
    if (
      !nameRegex.test(userData.firstName) ||
      !nameRegex.test(userData.lastName)
    ) {
      toast.error("Type your real name!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!emailRegex.test(userData.email)) {
      toast.error("Type a valid email address!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!phoneRegex.test(userData.phone)) {
      toast.error("Type a valid phone number!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (genderRegex.test(userData.gender)) {
      toast.error("Please, select your gender!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!passwordRegex.test(userData.password)) {
      toast.error("Password length must be at least 8 characters!", {
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
      toast.success("Your account has been created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // Store User Data
      store("userData", userData);
      // Update The Looged State
      setIsLoggedIn(true);
      // Navigate To The Home Page
      navigateTo("/");
      // Update The Website Currency
      setCurrency(countryCurrency);
      // Store Updated Currency
      store("currency", countryCurrency);
    }
  }

  return (
    <main className="signup">
      <div className="container">
        <h2>
          Become a Member at <br />
          <span>POWR Army</span>
        </h2>

        <form onSubmit={submitData}>
          <h3>Signup</h3>
          <div className="fields">
            <div className="input-field">
              <input
                placeholder="First Name"
                value={userData.firstName}
                onChange={(e) =>
                  dispatch({ type: "updateFirstName", value: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <input
                placeholder="Last Name"
                value={userData.lastName}
                onChange={(e) =>
                  dispatch({ type: "updateLastName", value: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <input
                placeholder="Email Address"
                value={userData.email}
                onChange={(e) =>
                  dispatch({ type: "updateEmail", value: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <span className="country-code">{countryCode}</span>
              <input
                type="tel"
                placeholder="Phone Number"
                value={userData.phone}
                onChange={(e) =>
                  dispatch({ type: "updatePhone", value: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <SelectBox>
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    dispatch({ type: "updateGender", value: e.target.value })
                  }
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </SelectBox>
            </div>
            <div className="input-field">
              <input
                type={isShown ? "text" : "password"}
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  dispatch({ type: "updatePassword", value: e.target.value })
                }
              />
              <span
                className={isShown ? "show-psw-btn active" : "show-psw-btn"}
                onClick={(e) => {
                  e.preventDefault();
                  setIsShown((p) => !p);
                }}
              >
                <FontAwesomeIcon icon={isShown ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <button className="main-btn">Signup</button>
        </form>
      </div>
    </main>
  );
}
