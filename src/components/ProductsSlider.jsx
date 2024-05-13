/* eslint-disable react/prop-types */
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// Splide Slider
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// React Hooks
import { useRef } from "react";
// React JSX Components
import ProductBox from "./ProductBox";

export default function ProductsSlider({ heading, displayedProductsArr }) {
  const slider = useRef();

  const breakpoints = {
    1199: {
      perPage: 5,
    },
    991: {
      perPage: 3,
    },
    767: {
      perPage: 2,
    },
    399: {
      perPage: 1,
    },
  };

  function slidePrev() {
    slider.current.go("-1");
  }

  function slideNext() {
    slider.current.go("+1");
  }

  return (
    <section className="products-slider">
      <div className="header">
        <h2>{heading}</h2>
        <div className="buttons">
          <button className="main-btn" onClick={slidePrev}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="main-btn" onClick={slideNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>

      <Splide
        ref={slider}
        options={{
          arrows: false,
          pagination: false,
          gap: "10px",
          breakpoints,
          perPage: 6,
          autoplay: true,
          interval: 3000,
        }}
      >
        {displayedProductsArr.map((p) => {
          return (
            <SplideSlide key={p.id}>
              <ProductBox
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
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
}
