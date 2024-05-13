// React Toatify Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Common Components
import PageLoader from "./PageLoader";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
// Reacr Router Components
import { Routes, Route } from "react-router-dom";
// React Methods, Components & Hooks
import { Suspense, lazy, createContext, useState, useEffect } from "react";
// Website Pages
const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const ProductView = lazy(() => import("./pages/ProductView"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Signup = lazy(() => import("./pages/Signup"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));
// Create Contexts
export const ProductsContext = createContext();
export const CurrencyContext = createContext();
export const AccountContext = createContext();
// React Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";

export default function App() {
  const { get } = useLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(get("userData") || false);
  const [currency, setCurrency] = useState(get("currency") || "SAR");
  const [allProducts, setAllProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState(
    get("savedProducts") || []
  );
  const [cartProducts, setCartProducts] = useState(get("cartProducts") || []);

  const subtotalPrice =
    cartProducts.length > 0
      ? cartProducts.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0)
      : 0;

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        let products = data.map((p) => {
          return {
            ...p,
            sarPrice: +p.price,
            sarOldPrice: +p.oldPrice,
          };
        });
        setAllProducts(products);
      });
  }, []);

  if (allProducts.length === 0) {
    return <PageLoader />;
  } else {
    return (
      <>
        <AccountContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <CurrencyContext.Provider value={{ currency, setCurrency }}>
            <ProductsContext.Provider
              value={{
                allProducts,
                setAllProducts,
                savedProducts,
                setSavedProducts,
                cartProducts,
                setCartProducts,
                subtotalPrice,
              }}
            >
              <Header />
              <Nav />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/store/:id" element={<ProductView />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/search-results" element={<SearchResults />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ProductsContext.Provider>
          </CurrencyContext.Provider>
        </AccountContext.Provider>
        <Footer />
        <ToastContainer />
      </>
    );
  }
}
