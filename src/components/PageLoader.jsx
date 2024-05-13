// Images
import logo from "../assets/imgs/logo.jpg";

export default function PageLoader() {
  return (
    <div className="page-loader">
      <img src={logo} alt="POWR eSports Store" />
      <span className="spinner"></span>
    </div>
  );
}
