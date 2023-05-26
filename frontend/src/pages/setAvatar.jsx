import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import loader from "../assets/loader.svg";
import { Buffer } from "buffer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setAvatarRoute } from "../routes/api.route";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/4567894";
  const navigate = useNavigate("/");
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  const getAvatarImage = async () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=5F9vYxQpOBNcj0`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAvatarImage();
  }, []);

  return (
    <>
      <ToastContainer />

      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        {isLoading ? (
          <img src={loader} alt="loader" className="loader" />
        ) : (
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
        )}
        <button className="submit-btn" onClick={setProfilePicture}>
          Set as Profile Picture
        </button>
      </Container>
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;

  .title-container {
    h1 {
      color: gray;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        cursor: pointer;
      }
    }
    .selected {
      border: 0.4rem solid #ff8b3d;
    }
  }
  .submit-btn {
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
`;
