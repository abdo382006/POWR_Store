// React Hooks
import { useContext, useEffect, useState } from "react";
// Contexts
import { ProductsContext } from "../App";
// React JSX Components & Functions
import ProductBox, { GetStars } from "../ProductBox";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
// React Router Hooks
import { useLocation } from "react-router-dom";

export default function Store() {
  const { allProducts } = useContext(ProductsContext);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(true);
  const [isRatesListOpen, setIsRatesListOpen] = useState(true);
  const [isPricesRangeOpen, setIsPricesRangeOpen] = useState(true);
  const [categoriesFilter, setCategoriesFilter] = useState("All");
  const [ratesFilter, setRatesFilter] = useState("All");
  const [priceFilter, setpriceFilter] = useState({ from: "", to: "" });

  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    switch (category) {
      case "kamstka_perfumes":
        setCategoriesFilter("Kamstka Perfumes");
        break;
      case "hoodies":
        setCategoriesFilter("Hoodies");
        break;
      case "perfumes":
        setCategoriesFilter("Perfumes");
        break;
      case "t_shirts":
        setCategoriesFilter("T-shirts");
        break;
      case "accessories":
        setCategoriesFilter("Accessories");
        break;
      case "brooches":
        setCategoriesFilter("Brooches");
        break;
      case "stickers":
        setCategoriesFilter("Stickers");
        break;
      default:
        setCategoriesFilter("All");
    }
  }, [category]);

  let displayedProducts = [...allProducts]
    .filter((p) => {
      if (categoriesFilter === "All") {
        return p;
      } else {
        return p.category === categoriesFilter;
      }
    })
    .filter((p) => {
      if (ratesFilter === "All") {
        return p;
      } else {
        return Math.floor(p.rate) == Number(ratesFilter[0]);
      }
    })
    .filter((p) => {
      if (priceFilter.from == "" && priceFilter.to == "") {
        return p;
      } else if (priceFilter.from != "" && priceFilter.to == "") {
        return p.price > Number(priceFilter.from);
      } else if (priceFilter.from == "" && priceFilter.to != "") {
        return p.price < Number(priceFilter.to);
      } else if (priceFilter.from != "" && priceFilter.to != "") {
        return (
          p.price > Number(priceFilter.from) && p.price < Number(priceFilter.to)
        );
      }
    });

  function updateFilter(e, seter) {
    seter(e.target.value);
  }

  function resetFilter() {
    setCategoriesFilter("All");
    setRatesFilter("All");
    setpriceFilter({ from: "", to: "" });
  }

  return (
    <main className="store">
      <div className="container">
        <aside>
          <div className="block">
            <h3 onClick={() => setIsCategoryListOpen((p) => !p)}>
              Category
              <button>
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </h3>
            <ul
              className={
                isCategoryListOpen ? "categories" : "categories closed"
              }
            >
              <li>
                <input
                  type="radio"
                  value="All"
                  id="allCategories"
                  checked={categoriesFilter === "All"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="allCategories">All</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Kamstka Perfumes"
                  id="kmPerfumes"
                  checked={categoriesFilter === "Kamstka Perfumes"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="kmPerfumes">Kamstka Perfumes</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Hoodies"
                  id="hoodies"
                  checked={categoriesFilter === "Hoodies"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="hoodies">Hoodies</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Perfumes"
                  id="perfumes"
                  checked={categoriesFilter === "Perfumes"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="perfumes">Perfumes</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="T-shirts"
                  id="tShirts"
                  checked={categoriesFilter === "T-shirts"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="tShirts">T-shirts</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Accessories"
                  id="accessories"
                  checked={categoriesFilter === "Accessories"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="accessories">Accessories</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Brooches"
                  id="brooches"
                  checked={categoriesFilter === "Brooches"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="brooches">Brooches</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Stickers"
                  id="stickers"
                  checked={categoriesFilter === "Stickers"}
                  onChange={(e) => updateFilter(e, setCategoriesFilter)}
                />
                <label htmlFor="stickers">Stickers</label>
              </li>
            </ul>
          </div>
          <div className="block">
            <h3 onClick={() => setIsRatesListOpen((p) => !p)}>
              Rates
              <button>
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </h3>
            <ul className={isRatesListOpen ? "rates" : "rates closed"}>
              <li>
                <input
                  type="radio"
                  id="allRates"
                  value="All"
                  checked={ratesFilter === "All"}
                  onChange={(e) => updateFilter(e, setRatesFilter)}
                />
                <label htmlFor="allRates">All Rates</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="5stars"
                  value="5 Stars"
                  checked={ratesFilter === "5 Stars"}
                  onChange={(e) => updateFilter(e, setRatesFilter)}
                />
                <label htmlFor="5stars">{GetStars(5)}</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="4stars"
                  value="4 Stars"
                  checked={ratesFilter === "4 Stars"}
                  onChange={(e) => updateFilter(e, setRatesFilter)}
                />
                <label htmlFor="4stars">{GetStars(4)}</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="3stars"
                  value="3 Stars"
                  checked={ratesFilter === "3 Stars"}
                  onChange={(e) => updateFilter(e, setRatesFilter)}
                />
                <label htmlFor="3stars">{GetStars(3)}</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="2stars"
                  value="2 Stars"
                  checked={ratesFilter === "2 Stars"}
                  onChange={(e) => updateFilter(e, setRatesFilter)}
                />
                <label htmlFor="2stars">{GetStars(2)}</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="1star"
                  value="1 Star"
                  checked={ratesFilter === "1 Star"}
                  onChange={(e) => updateFilter(e, setRatesFilter)}
                />
                <label htmlFor="1star">{GetStars(1)}</label>
              </li>
            </ul>
          </div>
          <div className="block">
            <h3 onClick={() => setIsPricesRangeOpen((p) => !p)}>
              Prices
              <button>
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </h3>
            <div
              className={
                isPricesRangeOpen ? "prices-range" : "prices-range closed"
              }
            >
              <input
                type="tel"
                placeholder="From"
                value={priceFilter.from}
                onChange={(e) =>
                  setpriceFilter((p) => {
                    return { ...p, from: e.target.value };
                  })
                }
              />
              -
              <input
                type="tel"
                placeholder="To"
                value={priceFilter.to}
                onChange={(e) =>
                  setpriceFilter((p) => {
                    return { ...p, to: e.target.value };
                  })
                }
              />
            </div>
          </div>
          <button className="main-btn reset-btn" onClick={resetFilter}>
            Reset Filter
          </button>
        </aside>

        <section className="products">
          <div className="header">
            <h2>Displayed Products</h2>
            <span>({displayedProducts.length})</span>
          </div>
          <div className="products-grid">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((p) => {
                return (
                  <ProductBox
                    key={p.id}
                    id={p.id}
                    isAvailable={p.isAvailable}
                    img={p.img}
                    title={p.title}
                    category={p.category}
                    rate={p.rate}
                    discount={p.discount}
                    price={p.price}
                    oldPrice={p.oldPrice}
                    sarPrice={p.sarPrice}
                  />
                );
              })
            ) : (
              <h2 className="empty-alert">No products to display!</h2>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
