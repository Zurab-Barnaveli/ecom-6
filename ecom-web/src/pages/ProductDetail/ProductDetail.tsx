import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Ajax } from "../../utils/Ajax";

import { useParams } from "react-router-dom";

import "./productDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image: React.SetStateAction<string>) => {
    setSelectedImage(image);
  };

  const fetchSingleProduct = async () => {
    const { data: productItem } = await Ajax.get(`/product/${id}`);
    console.log(productItem);
    setProduct(productItem);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);
  return (
    <Box>
      <Box>
        <img
          src={selectedImage}
          alt=""
          style={{
            width: "400px",
          }}
        />
      </Box>
      <Typography>{product?.title}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          marginRight: "10px",
          width: "350px",
          flexWrap: "wrap",
        }}
      >
        {product?.images.map(image => {
          return (
            <img
              src={image}
              className="product-img"
              onClick={() => handleImageClick(image)}
            />
          );
        })}
      </Box>
      <Typography>{product?.category}</Typography>
      <Typography>{product?.description}</Typography>
    </Box>
  );
};

export default ProductDetail;
