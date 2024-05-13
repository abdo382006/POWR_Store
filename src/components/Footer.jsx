// Images
import logo from "../assets/imgs/logo.jpg";
// React Router Components
import { Link } from "react-router-dom";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="col">
            <img src={logo} alt="POWR eSports Store" />
            <p>
              POWER eSports Team from 2010 till eternity. Digital Sports Fist
              Club Company
            </p>
          </div>
          <div className="col">
            <h4>Links</h4>
            <div className="links">
              <Link to="/">Home</Link>
              <Link to="/store">Store</Link>
              <Link to="/faqs">FAQs</Link>
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </div>
          <div className="col">
            <h4>Categories</h4>
            <div className="links">
              <Link to="/store?category=kamstka_perfumes">
                Kamstka Perfumes
              </Link>
              <Link to="/store?category=hoodies">Hoodies</Link>
              <Link to="/store?category=perfumes">Perfumes</Link>
              <Link to="/store?category=t_shirts">T-shirts</Link>
              <Link to="/store?category=accessories">Accessories</Link>
              <Link to="/store?category=brooches">Brooches</Link>
              <Link to="/store?category=stickers">Stickers</Link>
            </div>
          </div>
          <div className="col">
            <h4>Newsletter</h4>
            <p>Stay updated with our latest news via email.</p>
            <form className="input-bar">
              <input placeholder="Email address..." />
              <button>
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          Copyright &copy; {new Date().getFullYear()} | Created by{" "}
          <span>AK Arafat</span>
        </div>
      </div>
    </footer>
  );
}
