// React Router Hooks
import { useParams } from "react-router-dom";
// React Hooks
import { useState, useEffect, useContext } from "react";
// Splide Slider
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// React JSX Components
import PageLoader from "../PageLoader";
import ProductsSlider from "../ProductsSlider";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faStar } from "@fortawesome/free-solid-svg-icons";
// Contexts
import { ProductsContext, CurrencyContext } from "../App";
// Custom Hooks
import useLocalStorage from "../../hooks/useLocalStorage";
// React Toastify Alerts
import { toast } from "react-toastify";

export default function ProductView() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const { currency } = useContext(CurrencyContext);
  const { allProducts, cartProducts, setCartProducts } =
    useContext(ProductsContext);
  const { get, store } = useLocalStorage();
  const [mainImg, setMainImg] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);

  const isProductInCart =
    productData != null
      ? cartProducts.find((p) => p.title === productData.title && p.id == id)
      : null;

  function addProductToCart() {
    // Update Cart Products State
    setCartProducts([
      ...cartProducts,
      {
        id: productData.id,
        img: productData.img,
        title: productData.title,
        category: productData.category,
        price: productData.price,
        sarPrice: productData.sarPrice,
        quantity: 1,
      },
    ]);
    // Store Cart Products In The LS
    let quantity = get(`product-${id}-quantity`) || 1;
    store("cartProducts", [
      ...cartProducts,
      {
        id: productData.id,
        img: productData.img,
        title: productData.title,
        category: productData.category,
        price: productData.price,
        sarPrice: productData.sarPrice,
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

  useEffect(() => {
    const rightProduct = allProducts.filter((p) => p.id == id)[0];
    setProductData(rightProduct);
    setMainImg(rightProduct.img);
    setSimilarProducts(
      allProducts
        .filter(
          (p) => p.category == rightProduct.category && p.id != rightProduct.id
        )
        .slice(0, 8)
    );
  }, [id]);

  if (productData == null) {
    <PageLoader />;
  } else {
    return (
      <main
        className={
          productData.isAvailable ? "product-view" : "product-view sold-out"
        }
      >
        <div className="container">
          <section className="product-data">
            <div className="images">
              <figure className="image-container main-image">
                <img
                  src={mainImg}
                  alt={productData.title}
                  title={productData.title}
                />
              </figure>
              {productData.allImgs && (
                <Splide
                  className="all-images"
                  options={{
                    arrows: false,
                    pagination: false,
                    gap: "10px",
                    perPage: 4,
                    autoplay: true,
                    interval: 3000,
                  }}
                >
                  {productData.allImgs.map((img, i) => {
                    return (
                      <SplideSlide
                        className="image-container"
                        key={i}
                        onClick={() => {
                          setMainImg(img);
                        }}
                      >
                        <img src={img} alt={productData.title} />
                      </SplideSlide>
                    );
                  })}
                </Splide>
              )}
            </div>

            <div className="text">
              <span className="category">{productData.category}</span>
              <h1>{productData.title}</h1>
              <div className="reviews">
                <span className="rate">
                  <FontAwesomeIcon icon={faStar} /> {productData.rate}
                </span>
                <span className="rate-count">({productData.ratesCount})</span>
              </div>
              <div className="price">
                <span className="new">
                  {currency} {productData.price}
                </span>
                {productData.oldPrice != 0 && (
                  <span className="old">
                    {currency} {productData.oldPrice}
                  </span>
                )}
              </div>
              <p className="description">{productData.description}</p>
              {!isProductInCart ? (
                <button className="main-btn" onClick={addProductToCart}>
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Add To Cart
                </button>
              ) : (
                <input
                  type="number"
                  value={get(`product-${id}-quantity`) || 1}
                  min={1}
                  onChange={(e) => {
                    // Store Quantity
                    store(`product-${id}-quantity`, e.target.value);
                    // Update Quantity
                    setCartProducts((products) =>
                      [...products].map((p) => {
                        if (p.id == id) {
                          return {
                            ...p,
                            quantity: get(`product-${id}-quantity`),
                          };
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
                          return {
                            ...p,
                            quantity: get(`product-${id}-quantity`),
                          };
                        } else {
                          return p;
                        }
                      })
                    );
                  }}
                />
              )}
            </div>
          </section>

          <ProductsSlider
            heading="You May Also Like"
            displayedProductsArr={similarProducts}
          />
        </div>
      </main>
    );
  }
}
