import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatInput = ({ sendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, e) => {
    console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      sendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker} />
            {showEmojiPicker && (
              <div className="emoji-picker-react">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            placeholder="Type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />

          <button type="submit">
            <IoMdSend size={28} />
          </button>
        </form>
      </Container>
    </>
  );
};

export default ChatInput;

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #d3d3d3;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  @media screen and (min-width: 320px) and (max-width: 720px) {
    padding: 0 0.4rem;
    gap: 0.3rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -455px;
        box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08),
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    display: flex;
    width: 100%;
    border-radius: 2rem;
    background-color: #77acc7;
    color: ;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      border: none;
      color: white;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #607b8e;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: #383838;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      @media screen and (min-width: 320px) and (max-width: 720px) {
        padding: 0.3rem 0.6rem;
        svg {
          font-size: 0.2rem;
        }
        id
      }
      svg {
        font-size: 2rem;
        color: #dfcbcf;
      }
    }
  }
`;
