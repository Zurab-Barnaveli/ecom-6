import React from "react";

import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import "./Navigation.styles.scss";

import NavigationDropDownHover from "./Navigation-DropDownHover/NavigationDropDownHover";

import Modal from "./SearchBar/SearchBar";
import AuthModal from "./authModal/AuthModal";

const Navigation = () => {
  return (
    <>
      <Box
        className="header__top"
        sx={{
          borderBottom: "1px solid #e5e5e5",
          paddingBottom: "10px",
          paddingTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Box
            className="header__hot__line"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <img
              src="/src/assets/icons/phone-contact.svg"
              alt="Logo"
              className="phone__logo"
            />

            <Typography
              className="phone__text"
              sx={{
                fontSize: "12px",
                fontFamily: "firaGO",
                fontWeight: "500",
                color: "#99a8b4",
              }}
            >
              ცხელი ხაზი
            </Typography>

            <a
              href="tel:*7007 / +995 (32) 2 60 30 60 "
              className="phone__number"
            >
              *7007 / +995 (32) 2 60 30 60
            </a>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Typography
              sx={{
                color: "#99a8b4",
                fontSize: "12px",
                fontFamily: "firaGo",
              }}
            >
              ონლაინ განვადება
            </Typography>
            <Typography
              sx={{
                color: "#99a8b4",
                fontSize: "12px",
                fontFamily: "firaGo",
              }}
            >
              ფილიალები
            </Typography>
            <Typography
              sx={{
                color: "#fe5f55",
                fontSize: "12px",
                fontFamily: "firaGo",
              }}
            >
              ყველა აქცია
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        className="header__bottom"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Link to="/">
          <Box className="main__logo">
            <img src="/src/assets/icons/logo.svg" alt="logo" />
          </Box>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Modal />
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "space-between",
              }}
            ></Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <AuthModal />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginRight: "10px",
            }}
          >
            <NavigationDropDownHover />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
