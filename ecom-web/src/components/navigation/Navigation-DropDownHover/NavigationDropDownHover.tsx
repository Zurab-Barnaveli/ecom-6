import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { useStore } from "../../../zustand/store";

import "./NavigationDropDownHover.styles.scss";

const NavigationDropDownHover = () => {
  const { cartItems, getTotalPrice } = useStore();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          float: "right",
          cursor: "pointer",
        }}
        className="right-menu"
      >
        <img src="/src/assets/icons/cart.svg" alt="cart" />
        <button className="cart-button">{getTotalPrice()}ლ</button>
        <Box
          sx={{
            position: "absolute",
            display: "none",
            left: "57px",
            zIndex: 1,
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          className="dropdown-menu"
        >
          <Box
            sx={{
              width: " 271px",
              height: " 200px",
              marginTop: "2px",
              marginRight: "15px",
              position: "absolute",
              right: "-20px",
              top: "0px",
              borderRadius: "15px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              display: "flex",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Typography
                  className="cart-item"
                  sx={{
                    textDecoration: "none",
                    color: "#0a3251",
                    paddingTop: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontFamily: "firaGO",
                    marginLeft: "15px",
                  }}
                >
                  კალათა
                </Typography>
                <div>{cartItems.length}</div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  marginRight: "15px",
                  marginTop: "50px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontFamily: "firaGO",
                    color: "#0a3251",
                    cursor: "pointer",
                  }}
                >
                  ლ
                </Typography>

                <p>{getTotalPrice()} </p>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontFamily: "firaGO",
                    color: "#688093",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  ჯამი:
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Link to="/cart">
                  <button className="in-cart-button">კალათაში გადასვლა</button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavigationDropDownHover;
