import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPowerOff } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <FaPowerOff />
    </Button>
  );
};

export default Logout;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #404040;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  svg {
    color: white;
    font-size: 1.3rem;
  }
`;
