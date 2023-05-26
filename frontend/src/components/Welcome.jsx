import React from "react";
import styled from "styled-components";
// import Robot from ''

const Welcome = ({ currentUser }) => {
  return (
    <>
      <Container>
        {/* <img /> */}
        <h1>
          Welcome, <span>{currentUser.username}</span>
        </h1>
        <h3>Please select a chat to start Chatting.</h3>
      </Container>
    </>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #696969;

  span {
    color: #2f4f4f;
    text-transform: uppercase;
  }
`;
