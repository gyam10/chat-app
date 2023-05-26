import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Contacts = ({ contacts, chatChange, currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentUserSelected, setCurrentUserSelected] = useState(null);

  useEffect(() => {
    // console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentUserSelected(index);
    chatChange(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Chatter</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentUserSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
export default Contacts;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #a9a9a9;
  border-radius: 1.5rem 0 0 1.5rem;
  .brand {
    display: flex;
    align-items: center;
    justify: center;
    gap: 0.5rem;
    margin-left: 0.5rem;
    img {
      height: 2rem;
    }
    h3 {
      color: #black;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.6rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #dcdcdc;
        // background-color: #808080;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #778899;
      min-height: 3.5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        color: white;
      }
    }
    .selected {
      background-color: #d3d3d3;
      .username {
        color: #696969;
      }
    }
  }
  .current-user {
    background-color: ;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3.5rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and(max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h3 {
          font-size: 1rem;
        }
      }
    }
    @media screen and(min-width:320px) and (max-width: 720px) {
      gap: 0.3rem;
      .username {
        h3 {
          font-size: 0.8rem;
        }
      }
    }
  }
`;
