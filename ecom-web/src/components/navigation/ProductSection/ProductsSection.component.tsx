import React, { useEffect } from "react";
import { useStore } from "../../../zustand/store";
import { CarouselItem } from "../Carousel/CarouselComponent";
import ProductList from "../../../pages/Home/ProductList";

const ProductSection = () => {
  const { fetchProduct, products, increasePageSize } = useStore();

  const handleButtonClick = () => {
    increasePageSize();
    fetchProduct();
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      <CarouselItem />
      <ProductList products={products} handleButtonClick={handleButtonClick} />
    </div>
  );
};

export default ProductSection;
