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
      src: "src/assets/imgs/maksora-banner.jpg",
    },
    {
      id: 32,
      title: "Sumou Prime Perfume",
      src: "src/assets/imgs/sumou-prime-banner.jpg",
    },
    {
      id: 21,
      title: "Glorious Perfume",
      src: "src/assets/imgs/glorious-banner.jpg",
    },
  ];
  const imgs2 = [
    {
      id: 19,
      title: "SXB Dragon Hoodie",
      src: "src/assets/imgs/sxb-dragon-hoodie-banner.jpg",
    },
    {
      id: 13,
      title: "RR Hoodie",
      src: "src/assets/imgs/rr-hoodie.jpg",
    },
  ];
  const imgs3 = [
    {
      id: 33,
      title: "Royal Perfume",
      src: "src/assets/imgs/royal-banner.jpg",
    },
    {
      id: 35,
      title: "POWR 13Years Perfume",
      src: "src/assets/imgs/powr-perfume-banner.jpg",
    },
  ];
  const imgs4 = [
    {
      id: 66,
      title: "B7 Brooch",
      src: "src/assets/imgs/b7-brooch-banner.jpg",
    },
    {
      id: 71,
      title: "C7 Brooch",
      src: "src/assets/imgs/c7-brooch-banner.jpg",
    },
    {
      id: 74,
      title: "FRS Brooch",
      src: "src/assets/imgs/frs-brooch-banner.jpg",
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
