// Images
import banner1 from "../../assets/imgs/maksora-banner.jpg";
import banner2 from "../../assets/imgs/sumou-prime-banner.jpg";
import banner3 from "../../assets/imgs/glorious-banner.jpg";
import banner4 from "../../assets/imgs/sxb-dragon-hoodie-banner.jpg";
import banner5 from "../../assets/imgs/rr-hoodie.jpg";
import banner6 from "../../assets/imgs/royal-banner.jpg";
import banner7 from "../../assets/imgs/powr-perfume-banner.jpg";
import banner8 from "../../assets/imgs/b7-brooch-banner.jpg";
import banner9 from "../../assets/imgs/c7-brooch-banner.jpg";
import banner10 from "../../assets/imgs/frs-brooch-banner.jpg";
// React JSX Components
import Hero from "../Hero";
import Features from "../Features";
import Banners from "../Banners";
import ProductsSlider from "../ProductsSlider";
// React Hooks
import { useContext } from "react";
// Products Context
import { ProductsContext } from "../App";

export default function Home() {
  const imgs1 = [
    {
      id: 1,
      title: "Kamstka Perfume",
      src: banner1,
    },
    {
      id: 32,
      title: "Sumou Prime Perfume",
      src: banner2,
    },
    {
      id: 21,
      title: "Glorious Perfume",
      src: banner3,
    },
  ];
  const imgs2 = [
    {
      id: 19,
      title: "SXB Dragon Hoodie",
      src: banner4,
    },
    {
      id: 13,
      title: "RR Hoodie",
      src: banner5,
    },
  ];
  const imgs3 = [
    {
      id: 33,
      title: "Royal Perfume",
      src: banner6,
    },
    {
      id: 35,
      title: "POWR 13Years Perfume",
      src: banner7,
    },
  ];
  const imgs4 = [
    {
      id: 66,
      title: "B7 Brooch",
      src: banner8,
    },
    {
      id: 71,
      title: "C7 Brooch",
      src: banner9,
    },
    {
      id: 74,
      title: "FRS Brooch",
      src: banner10,
    },
  ];
  const { allProducts } = useContext(ProductsContext);
  const KamstkaPerfumes = allProducts.slice(0, 7);
  const hoodies = allProducts.slice(11, 18);
  const perfumes = allProducts.slice(21, 28);
  const brooches = allProducts.slice(65, 72);

  return (
    <main className="home">
      <div className="container">
        <Hero />
        <Features />
        <Banners type="grid-3" imagesArr={imgs1} />
        <ProductsSlider
          heading="Kamstka Series Perfumes"
          displayedProductsArr={KamstkaPerfumes}
        />
        <Banners type="grid-2" imagesArr={imgs2} />
        <ProductsSlider heading="Top Hoodies" displayedProductsArr={hoodies} />
        <Banners type="grid-2" imagesArr={imgs3} />
        <ProductsSlider
          heading="Best Perfumes"
          displayedProductsArr={perfumes}
        />
        <Banners type="grid-3" imagesArr={imgs4} />
        <ProductsSlider
          heading="New Brooches"
          displayedProductsArr={brooches}
        />
      </div>
    </main>
  );
}
