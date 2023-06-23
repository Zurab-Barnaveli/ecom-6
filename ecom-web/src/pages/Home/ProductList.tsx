import React, { VoidFunctionComponent } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "./ProductList.scss";
import { Box, Button } from "@mui/material";
import { useStore } from "../../zustand/store";

type ProductProps = {
  products: Product[];
  handleButtonClick: () => void;
};

const ProductList = ({ products, handleButtonClick }: ProductProps) => {
  const { setCartItems, cartItems } = useStore();

  const handleAddToCart = (product: Product) => {
    setCartItems(product);
    console.log(cartItems);
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 320px)",
        gap: "1rem",
        marginTop: "1rem",
        marginLeft: "7rem",
      }}
    >
      {products.map((product) => (
        <Box key={product.id}>
          <div className='product_label'>
            ფასდაკლება
            <div className='product_label_after'></div>
            <div className='product_label_before'></div>
          </div>
          <Box
            key={product.id}
            sx={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "245px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              height: "250px",
              color: "black",
            }}
          >
            <Link to={`/product/${product.id}`} key={product.id}>
              <img src={product.images[0]} alt='' className='prod-img' />

              <Box
                sx={{
                  fontSize: "12px",
                }}
                onClick={() => console.log(product.brand)}
              >
                {product.title}
              </Box>
            </Link>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  color: "#fb7613",
                  fontWeight: "600",
                  fontSize: "17px",
                }}
              >
                {parseFloat(product.price.toString()).toFixed(2)} ₾
              </Box>
              <Box
                sx={{
                  fontSize: "17px",
                }}
              >
                <Button onClick={() => handleAddToCart(product)}>
                  <AddShoppingCartIcon />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
      <Button onClick={handleButtonClick}>More</Button>
    </Box>
  );
};

export default ProductList;
