import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoutes, sendMessageRoute } from "../routes/api.route";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  // changes in chats
  const chatChange = async () => {
    if (currentChat) {
      const response = await axios.post(getAllMessagesRoutes, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  };

  useEffect(() => {
    chatChange();
  }, [currentChat]);

  // Msg send handling

  const handleSendMsg = async (msg) => {
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    };
    await axios.post(sendMessageRoute, data);
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    // console.log(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      // console.log("here");
      socket.current.on("msg-recieve", (msg) => {
        // console.log({ msg });
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  // New arrival msgs run every time
  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-msgs">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }  `}
                  >
                    <div className="content">
                      <p>{message.messages}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput sendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

export default ChatContainer;
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and(max-width: 1080px) {
    grid-auto-rows: 15% 70% 15%;
  }
  @media screen and(min-width:320px) and (max-width: 720px) {
    grid-auto-rows: 10% 80% 10%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #3b424c;
        }
      }
    }
  }
  .chat-msgs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: gray;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        @media screen and (min-width: 320px) and (max-width: 720px) {
          max-width: 60%%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #42a5f5;
        color: white;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #cac8ce;
        color: black;
      }
    }
  }
`;
