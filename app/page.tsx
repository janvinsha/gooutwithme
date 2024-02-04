"use client";

import React, { useState, ButtonHTMLAttributes } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import bunnyCry from "./animations/bunnyCry.json";
import bunnyPlease from "./animations/bunnyPlease.json";
import bunnyYes from "./animations/bunnyYes.json";
import bunnyPunch from "./animations/bunnyPunch.json";
import bunnyCool from "./animations/bunnyCool.json";
import bunnyText from "./animations/bunnyText.json";

const createBunnyOptions = (animationData: any) => {
  return {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
}
function Home() {
  const bunnyCryOptions = createBunnyOptions(bunnyCry);
  const bunnyPleaseOptions = createBunnyOptions(bunnyPlease);
  const bunnyCoolOptions = createBunnyOptions(bunnyCool);
  const bunnyYesOptions = createBunnyOptions(bunnyYes);
  const bunnyPunchOptions = createBunnyOptions(bunnyPunch);
  const bunnyTextOptions = createBunnyOptions(bunnyText);
  const [bunnyState, setBunnyState] = useState("normal")
  const [hovered, setHovered] = useState(false);
  const [size, setSize] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [hasStarted, setHasStarted] = useState(false)

  const bunnyObj: { [key: number]: string } = { 0: "cry", 1: "punch" };
  const handleHover = (hoverState: boolean) => {
    setHasStarted(true);
    if (hoverState === true) {
      const id = setInterval(() => {
        setSize((prevSize) => prevSize + 1);
        const randomBunnyState = Math.floor(Math.random() * 2);
        setBunnyState(bunnyObj[randomBunnyState] as string)
      }, 100);
      setIntervalId(id);
    } else {
      // If mouse leaves, clear the interval to stop increasing size
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null); // Reset the interval ID
      }
    }
    setHovered(hoverState);

  };
  const buttonStyle = {
    fontSize: `${16 * size}px`,
    padding: `${10 * size}px ${20 * size}px`,
    width: `${100 * size}px`,
    height: `${40 * size}px`,
  };

  return (
    <StyledHome data-testid="container">
      <div className="home-container">
        {bunnyState === "yes" ? <div className="title">Text me Baby  !!!!</div> : <div className="title">Will you be my Val?</div>}
        <div className="animation">
          {bunnyState === "normal" && <Lottie options={bunnyPleaseOptions} height={300} width={300} />}
          {bunnyState === "cool" && <Lottie options={bunnyCoolOptions} height={300} width={300} />}
          {bunnyState === "cry" && <Lottie options={bunnyCryOptions} height={300} width={300} />}
          {bunnyState === "yes" && <Lottie options={bunnyTextOptions} height={400} width={400} />}
          {bunnyState === "punch" && <Lottie options={bunnyPunchOptions} height={300} width={300} />}
        </div>
        {bunnyState !== "yes" && <div className="buttons">
          <YesButton style={buttonStyle} onClick={() => setBunnyState("yes")} onMouseEnter={() => setBunnyState("cool")}>Yes</YesButton>
          <button
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            style={{
              fontSize: `16px`,
              padding: `10px 20px`,
              width: `100px`,
              height: `40px`,
            }}
          >
            No
          </button>
        </div>}
      </div>
    </StyledHome >
  );
}

const StyledHome = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color:#feeafb;
  .home-container{
    display: flex;
    flex-direction:column;
    gap:3rem;
    align-items: center;
    justify-content: center;
    .title{
      font-size: 2rem;
      color:#5caff3;
      font-family: comic sans ms;
    }
  }
  .buttons{
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;

interface YesButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const YesButton = styled.button<YesButtonProps>`
`;
export default Home;
