// Splide Slider
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// Font Awsome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faGift,
  faHeadset,
  faPercent,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

export default function Features() {
  const breakpoints = {
    1199: {
      perPage: 3,
    },
    991: {
      perPage: 2,
    },
    767: {
      perPage: 1,
    },
  };

  return (
    <section className="features">
      <Splide
        options={{
          arrows: false,
          pagination: false,
          perPage: 5,
          breakpoints,
          gap: "20px",
          type: "loop",
          autoplay: true,
          interval: 3000,
        }}
      >
        <SplideSlide>
          <div className="box">
            <span className="icon">
              <FontAwesomeIcon icon={faTruckFast} fixedWidth />
            </span>
            <div className="text">
              <h4>Fast Shipping</h4>
              <p>Experience rapid, efficient shipping for prompt delivery.</p>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="box">
            <span className="icon">
              <FontAwesomeIcon icon={faGift} fixedWidth />
            </span>
            <div className="text">
              <h4>Surprise Offers</h4>
              <p>
                Surprise offers: savings and delight with each purchase. Stay
                tuned!
              </p>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="box">
            <span className="icon">
              <FontAwesomeIcon icon={faHeadset} fixedWidth />
            </span>
            <div className="text">
              <h4>Support 24 / 7</h4>
              <p>Support 24/7: reliable assistance anytime, day or night.</p>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="box">
            <span className="icon">
              <FontAwesomeIcon icon={faPercent} fixedWidth />
            </span>
            <div className="text">
              <h4>Affordable Prices</h4>
              <p>
                Affordable prices: quality products, unbeatable deals,
                accessible shopping.
              </p>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="box">
            <span className="icon">
              <FontAwesomeIcon icon={faCreditCard} fixedWidth />
            </span>
            <div className="text">
              <h4>Secure Payment</h4>
              <p>
                Secure payment: protect your transactions with advanced
                encryption.
              </p>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </section>
  );
}
