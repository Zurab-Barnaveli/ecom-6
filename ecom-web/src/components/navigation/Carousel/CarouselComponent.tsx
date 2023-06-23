import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.scss";
import { Link } from "react-router-dom";

export const CarouselItem = () => {
  const carouselProducts = [
    {
      id: 1,
      title: "Product 1",
      image: "https://img.zoommer.ge/zoommer-images/thumbs/0192904.png",
    },
    {
      id: 2,
      title: "Product 2",
      image: "https://img.zoommer.ge/zoommer-images/thumbs/0192756.png",
    },
    {
      id: 3,
      title: "Product 3",
      image: "https://img.zoommer.ge/zoommer-images/thumbs/0192906.png",
    },
    {
      id: 4,
      title: "Product 4",
      image: "https://img.zoommer.ge/zoommer-images/thumbs/0193564.png",
    },
    {
      id: 5,
      title: "Product 5",
      image: "https://img.zoommer.ge/zoommer-images/thumbs/0193562.png",
    },
  ];

  return (
    <>
      <Carousel autoPlay interval={2000} showThumbs={false} infiniteLoop>
        {carouselProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div>
              <img src={product.image} alt={product.title} />
            </div>
          </Link>
        ))}
      </Carousel>
    </>
  );
};
