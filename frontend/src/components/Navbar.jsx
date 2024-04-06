import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bitslogo from "../images/bits-logo.gif";
import bitstagline from "../images/bits-tagline.png";
import bitsline from "../images/bits-line.gif";
const Bitstaglineimage = styled.img`
  width: 226px;
  height: auto; // Use auto to maintain aspect ratio
  max-width: 100%; // Ensure it doesn't overflow its container
`;

const Bitslogoimage = styled.img`
  width: 226px; // Fix typo from 'wigth' to 'width'
  height: auto; // Use auto to maintain aspect ratio
  max-width: 100%; // Ensure it doesn't overflow its container
  cursor: pointer; // Add cursor pointer style
`;

const Images1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; // Adjusted for responsiveness
  padding: 20px; // Adjusted padding for a consistent look
  align-items: center; // Align items vertically

  @media (max-width: 768px) {
    gap: 20px; // Reduce gap on smaller screens
    padding-left: 20px;
    flex-direction: column; // Stack images vertically on small screens
  }
`;

const Bitslineimage = styled.img`
  width: 100%;
  height: 5px; // Use auto to maintain aspect ratio
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <Images1>
        <Bitslogoimage src={bitslogo} alt="BITS Logo" onClick={handleLogoClick} />
        <h2>FDCM ALLOTMENT</h2>
        <Bitstaglineimage src={bitstagline} alt="BITS Tagline" />
      </Images1>
      <Bitslineimage src={bitsline} alt="BITS Line" />
    </>
  );
};

export default Navbar;