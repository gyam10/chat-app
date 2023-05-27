import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { allUsersRoutes, host } from "../routes/api.route";
import Contacts from "../components/Contacts";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/Chatcontainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUserCheck = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  });

  useEffect(() => {
    currentUserCheck();
  }, []);

  const currentUserAvatarCheck = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
        setContacts(data.data.users);
      } else {
        navigate("/setAvatar");
      }
    }
  };

  useEffect(() => {
    currentUserAvatarCheck();
  }, [currentUser]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            chatChange={handleChangeChat}
          />
          {isLoaded && currentChat === null ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
};
export default Chat;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f5f5;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #d3d3d3;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 1.5rem;
    box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08),
      0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 16px rgba(18, 71, 52, 0.03);
    @media screen and (min-width: 720px) and(max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and(min-width:320px) and (max-width: 720px) {
      grid-template-columns: 30% 70%;
    }
  }
`;
