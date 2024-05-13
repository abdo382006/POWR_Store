// Images
import logo from "../../assets/imgs/logo.jpg";

// React Router Component
import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <div className="header">
          <img src={logo} alt="Not Found" />
          <h2>404</h2>
        </div>
        <h1>Page Not Found</h1>
        <p>
          Looks like you reached a dusty corner of our website! The page you
          requested is missing, but don't worry - we can help you get back on
          track. Try using the search bar above or head back to the homepage to
          find what you're looking for.
        </p>
        <Link to="/">Back to Home Page</Link>
      </div>
    </main>
  );
}
