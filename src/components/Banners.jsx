/* eslint-disable react/prop-types */
// React Router Components
import { Link } from "react-router-dom";

export default function Banners({ type, imagesArr }) {
  return (
    <section className={`banners ${type}`}>
      {imagesArr.map((img) => {
        return (
          <figure className="image-container" key={img.id}>
            <Link to={`/store/${img.id}`} title={img.title}>
              <img src={img.src} alt={img.title} />
            </Link>
          </figure>
        );
      })}
    </section>
  );
}
