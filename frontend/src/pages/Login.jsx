import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../routes/api.route";
const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.result));
        navigate("/");
      }
    }
  };

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username.length === "") {
      toast.error("Username and Password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chatter</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min={3}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have and Account? <Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f5f5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #6b6b6b;
    border-radius: 2rem;
    padding: 3rem 4rem;
    input {
      background-color: #f5f5f5;
      width: 100%;
      color: gray;
      border: 0.1rem solid #ff8b3d;
      border-radius: 0.4rem;
      padding: 1rem;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #0275d8;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-weight: bold;
      padding: 1rem 2rem;
      color: white;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #997af0;
      }
    }
    span {
      text-transform: uppercase;
      color: white;
      a {
        margin: 1rem;
        color: #000;
        text-decoration: none;
        font-weignt: bold;
      }
    }
  }
`;

export default Login;
