import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const getUserIdFromLocalStorage = () => {
  const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
  return userData? JSON.parse(userData)._id : null;
};

const handleLogout = async (id) => {
  try {
    const response = await axios.get(`${logoutRoute}/${id}`);
    if (response.status === 200) {
      localStorage.clear();
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const userId = getUserIdFromLocalStorage();
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }
    const logoutSuccess = await handleLogout(userId);
    if (logoutSuccess) {
      navigate("/login");
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

export default Logout;