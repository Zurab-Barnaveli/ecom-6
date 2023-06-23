import React, { useState, useRef, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import Register from "../../../Pages/Register/Register";
import LogIn from "../../../Pages/LogIn/LogIn";

import "./AuthModal.scss";

const AuthModal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !event.target.classList.contains("box-component")
    ) {
      closeModal();
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <LogIn />;
      case 1:
        return <Register />;
      default:
        return null;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div>
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              position: "relative",
            }}
            className='box-component'
            onClick={openModal}
          >
            <img src='/src/assets/icons/profileLogo.svg' alt='user' />
            <Typography
              sx={{
                color: "#0a3251",
              }}
            >
              პროფილი
            </Typography>
          </Box>
        </div>
        {isOpen && (
          <div className='modal' ref={modalRef}>
            <div className='modal-content'>
              <div className='modal-controls'>
                <div className='modal-btn'>
                  <button onClick={handleBack} disabled={activeStep === 0}>
                    უკან დაბრუნება
                  </button>
                  <button onClick={handleNext} disabled={activeStep === 1}>
                    რეგისტრაცია
                  </button>
                </div>
                <span onClick={closeModal}>X</span>
              </div>
              {renderStepContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
