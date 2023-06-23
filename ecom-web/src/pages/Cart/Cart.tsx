import { Box, Button, Typography } from "@mui/material";

import React from "react";

import { useStore } from "../../zustand/store";

const Cart = () => {
  const { getTotalPrice, cartItems } = useStore();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
      }}
    >
      <Box
        sx={{
          width: "65%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "30px",
            }}
          >
            <Typography>სახელი</Typography>
            <Typography>რაოდენობა</Typography>
            <Typography>ფასი</Typography>
            <Typography>ჯამი</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cartItems.map(item => (
              <Box
                key={item.id}
                sx={{
                  width: "150px",
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "205px",
                  }}
                >
                  <Typography>{item.title}</Typography>
                  <Typography>{item.amount}</Typography>
                  <Typography>{item.price}</Typography>
                  <Typography>{item.price * item.amount}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography>ჯამი :</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <Typography>სულ თანხა : {getTotalPrice()} ლ</Typography>
          <Typography>ჯამი : {getTotalPrice()} ლ</Typography>
          <Button>გადახდა</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
