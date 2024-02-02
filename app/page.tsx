"use client";
import React, { useState } from "react";
import styled from "styled-components";

function Home() {
  const [flamesVisible, setFlamesVisible] = useState(true);
  const [blowingStarted, setBlowingStarted] = useState(false)
  const startAudioCapture = async () => {
    setBlowingStarted(true)
    if (!window.AudioContext) {
      alert('Your browser does not support AudioContext');
      return;
    }
    let audioContext: AudioContext;
    audioContext = new AudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        analyser.getByteFrequencyData(dataArray);

        let maxVolume = Math.max(...dataArray);

        // Adjust the threshold value based on testing
        if (maxVolume > 230) {
          // alert("Blowing detected!");
          setFlamesVisible(false);
          stream.getTracks().forEach(track => track.stop());
        } else {
          requestAnimationFrame(checkAudio);
        }
      };

      requestAnimationFrame(checkAudio);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert("Microphone access denied or not available");
    }
  };


  const handleCandleClick = () => {
    setFlamesVisible(false);
  };


  return (
    <StyledHome data-testid="container">
      <div className="home-container">
        <div className="title">Happy Birthday To You</div>
        <div id="birthday-cake">
          <div className="cake">
            <div className="middle"></div>
            <div className="chocs"></div>
            <div className="top"></div>
          </div>
          <div className="candles" onClick={handleCandleClick}>
            <div className="flame" style={{ opacity: flamesVisible ? 1 : 0 }}></div>
            <div className="flame2" style={{ opacity: flamesVisible ? 1 : 0 }}></div>
            <div className="flame3" style={{ opacity: flamesVisible ? 1 : 0 }}></div>
            <div className="text">Happy Birthday!</div>
            <div className="shadows"></div>
          </div>
        </div>
        <button onClick={startAudioCapture}>{blowingStarted ? "Blow now!" : "Start Blowing"}</button>
        <div>
          <audio controls autoPlay loop>
            <source src="/audio/hbd.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
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
  }

  #birthday-cake {
  position: relative;
  top:30px;
  left:0;
  margin: 10rem 0rem;
}

#birthday-cake:before {
  content:"";
  position: absolute;
  background-color: #ede0d4;
  width: 400px;
  height:140px;
  border-radius:50%;
  left:50%;
  top:50%;
  transform: translate(-50%,-10%);
  box-shadow: inset -2px -5px #e6ccb2;
}

.cake {
  position: absolute;
  background-color: #ddb892;
  width: 350px;
  height:130px;
  transform: translate(-50%,-60%);
}

.cake:before, .cake:after {
  content:"";
  position: absolute;
}

.cake:before, .middle, .middle:before {
  border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
  width:350px;
  height:50px;
}

.cake:before {
  background-color: #ddb892;
  top:130px;
}

.cake:after {
  background-color: #b08968;
  width:350px;
  height:30px;
  top:50px;
}

.middle {
  position: absolute;
  background-color: #b08968;
  top:80px;
  z-index:1;
}

.middle:before {
  content:"";
  position: absolute;
  background-color: #ddb892;
  top:-35px;
}

.top {
  position: absolute;
  background-color: #7f5539;
  width:350px;
  height: 90px;
  border-radius:50%;
  z-index:2;
  top:-45px;
  box-shadow: inset -5px -1px #fff, inset -70px 2px rgba(255,255,255,.1);
}

.chocs {
  position: absolute;
  width: 55px;
  height:50px;
  background-color: #7f5539;
  top:0;
  z-index:1;
  border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
  box-shadow: 49px 20px #7f5539, 98px 25px #7f5539, 147px 30px #7f5539, 196px 25px #7f5539, 245px 20px #7f5539, 295px 0 #7f5539, 0px 4px #fff, 49px 24px #fff, 98px 29px #fff, 147px 34px #fff, 196px 29px #fff, 245px 24px #fff, 295px 4px #fff;
}

.chocs:before {
  content:"";
  position: absolute;
  width:175px;
  height:180px;
  background-color: rgba(255,255,255,.1);
  border-radius: 100% 0% 100% 0% / 0% 72% 28% 100%;
  left:175px;
  top:0;
}

.candles {
  position: absolute;
  width:30px;
  height: 80px;
  background-color: #0081a7;
  top:-160px;
  left:-20px;
  box-shadow: 50px 20px #0081a7, -50px 20px #0081a7;
}

.candles:before {
  content:"";
  position: absolute;
  width:30px;
  height: 10px;
  background-color: #0081a7;
  border-radius:50%;
  top:-5px;
  box-shadow: 0 80px #0081a7, -50px 20px #0081a7, -50px 100px #0081a7, 50px 20px #0081a7, 50px 100px #0081a7, inset 2px -1px #fff;
}

.candles:after {
  content:"";
  position: absolute;
  width:30px;
  height: 10px;
  border-radius:50%;
  top:15px;
  left:50px;
  box-shadow: inset 2px -1px #fff;
}

.shadows {
  position: absolute;
  width:30px;
  height: 10px;
  border-radius:50%;
  box-shadow: inset 2px -1px #fff;
  left:-50px;
  top:15px;
}

.shadows:before {
  content:"";
  position: absolute;
  background-color: #333;
  width:1.5px;
  height:15px;
  left:14.5px;
  top:-10px;
  box-shadow:50px -20px #333, 100px 0 #333;
}

.shadows:after {
  content:"";
  position: absolute;
  width:15px;
  height:90px;
  left:15px;
  background-color: rgba(255,255,255,.1);
  box-shadow: 50px -20px rgba(255,255,255,.1), 100px 0 rgba(255,255,255,.1);
  border-radius: 0% 100% 50% 50% / 100% 6% 10% 0%;
}


.flame, .flame:before, .flame2, .flame2:before, .flame3, .flame3:before {
  position: absolute;
  border-radius: 80% 15% 55% 50% / 55% 15% 80% 50%;
}

.flame,.flame3, .flame2 {
  cursor: pointer;
  width:30px;
  height: 30px;
  transform: rotate(-45deg);
  z-index:4;
  background-color: rgba(252,191,73,.8);
  transition: .5s;
  animation: flame .5s infinite;
}

.flame {
  top:-40px;
}

.flame2, .flame3 {
  top: -20px;
}

.flame2 {
  left:-50px;
}

.flame3 {
  left: 50px;
}

.flame:before, .flame2:before, .flame3:before {
  content:"";
  background-color: rgba(247,127,0,.4);
  width:20px;
  height:20px;
  top:5px;
  left:5px;
}


@keyframes flame {
  0%, 25%, 100% {transform: scaleY(1) rotate(-45deg);}
  50%, 75% {transform: scaleY(1.1) rotate(-45deg);}
}

.text, .text2 {
  position: absolute;
  color: white;
  font-family: 'Brush Script MT', cursive;
  text-align: center;
}
.text {
  width:350px;
  font-size: 50px;
  left:-140px;
  top:100px;
  z-index:-1;
  transition: .3s;
  opacity:0;
}

.text2 {
  font-size: 25px;
  width: 300px;
  top:105px;
  left:-140px;
}
`;

export default Home;
