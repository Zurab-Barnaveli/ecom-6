import { Box, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Ajax } from "../../utils/Ajax";
import { useParams } from "react-router-dom";
import "./productDetail.scss";
import { useStore } from "../../zustand/store";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useStore((state) => state.product);
  const selectedImage = useStore((state) => state.selectedImage);
  const setProduct = useStore((state) => state.setProduct);
  const setSelectedImage = useStore((state) => state.setSelectedImage);

  const handleImageClick = (image: React.SetStateAction<string>) => {
    setSelectedImage(image);
  };

  const fetchSingleProduct = async () => {
    const { data: productItem } = await Ajax.get(`/product/${id}`);
    setProduct(productItem);
    setSelectedImage(productItem.images[0]);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  return (
    <Box className='product-detail-container'>
      <Box className='product-image-container'>
        <img
          src={selectedImage}
          alt='Selected Product'
          className='selected-image'
        />
        <Box className='thumbnail-container'>
          {product?.images.map((image) => (
            <img
              src={image}
              alt='Thumbnail'
              className='thumbnail'
              onClick={() => handleImageClick(image)}
            />
          ))}
        </Box>
      </Box>
      <Box className='product-info-container'>
        <Typography variant='h4' className='product-title'>
          {product?.title}
        </Typography>
        <Typography variant='subtitle1' className='product-category'>
          Category: {product?.category}
        </Typography>
        <Typography className='product-description'>
          {product?.description}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          className='add-to-cart-button'
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
