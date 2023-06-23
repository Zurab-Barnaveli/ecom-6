/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import Box from "@mui/material/Box";

import { useStore } from "../../../zustand/store";

import { Button, TextField } from "@mui/material";

import { useEffect } from "react";

export default function searchBar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputValue, setInputValue] = React.useState("");

  const handleSearch = () => {
    fetchProduct(inputValue);
    setInputValue("");
  };

  const { fetchProduct } = useStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "25px" }}
        >
          <TextField
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            className="search__input"
            label="ძიება..."
            sx={{
              width: "780px",
              height: "50px",
            }}
            type="search"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              position: "absolute",
              right: 0,
            }}
          >
            <Button onClick={handleSearch}>
              <img
                src="/src/assets/icons/search.svg"
                alt="search"
                className="search__icon"
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
