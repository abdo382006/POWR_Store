// Splide Slider
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// Font Awsome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// React Router Components
import { Link } from "react-router-dom";
// React Hooks
import { useState } from "react";

export default function Hero() {
  const [isShow, setIsShow] = useState(false);

  return (
    <section className="hero">
      <div className="categories-box">
        <button onClick={() => setIsShow((p) => !p)}>
          Categories
          <span className="icon">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
        <div className={isShow ? "categories-list show" : "categories-list"}>
          <Link to="/store?category=kamstka_perfumes">Kamstka Perfumes</Link>
          <Link to="/store?category=hoodies">Hoodies</Link>
          <Link to="/store?category=perfumes">Perfumes</Link>
          <Link to="/store?category=t_shirts">T-shirts</Link>
          <Link to="/store?category=accessories">Accessories</Link>
          <Link to="/store?category=brooches">Brooches</Link>
          <Link to="/store?category=stickers">Stickers</Link>
        </div>
      </div>

      <div className="slider">
        <Splide
          options={{
            gap: "20px",
            type: "loop",
            autoplay: true,
            interval: 3000,
          }}
        >
          <SplideSlide>
            <figure className="image-container">
              <Link to="/store/24">
                <img
                  src="src/assets/imgs/fearchouli-plus-banner.png"
                  alt="Fearchouli Plus Perfume"
                />
              </Link>
            </figure>
          </SplideSlide>

          <SplideSlide>
            <figure className="image-container">
              <Link to="/store/16">
                <img
                  src="src/assets/imgs/viora-hoodie-banner.jpg"
                  alt="Viora Hoodie"
                />
              </Link>
            </figure>
          </SplideSlide>

          <SplideSlide>
            <figure className="image-container">
              <Link to="/store/91">
                <img
                  src="src/assets/imgs/powr-hoodies-banner.jpg"
                  alt="POWR Hoodies"
                />
              </Link>
            </figure>
          </SplideSlide>
        </Splide>
      </div>
    </section>
  );
}
