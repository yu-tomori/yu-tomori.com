import React from "react";
import styled, { keyframes } from "styled-components";

const Card = styled.div`
  position: relative;
  width: 300px;
  height: 425px;
  margin: 60px auto;
  perspective: 1200px;
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 10px solid #9612eb;
  background-color: #9612eb;
  transform-origin: left center;
  transition: transform 1s ease;
  backface-visibility: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  ${Card}:hover & {
    transform: rotateY(-170deg);
  }
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 10px solid #9612eb;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgSet = styled.div`
  width: 90%;

  img {
    width: 100%;
    border-radius: 6px;
    box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.25);
  }
`;

const TextContainer = styled.div`
  text-align: center;
`;

const TextHead = styled.p`
  font-size: 1em;
  margin-bottom: 20px;
`;

const TextBody = styled.p`
  font-size: 0.95em;
  line-height: 1.5;
  text-align: left;
`;

const floatingY = keyframes`
  0% {
    transform: translateY(-20%);
  }
  100% {
    transform: translateY(20%);
  }
`;

const Guide = styled.p`
  text-align: center;
  animation: ${floatingY} 1.2s ease-in-out infinite alternate-reverse;
`;


const KaoruBirthday2026 = () => {
  return (
	<>
	    <Card>
	      <Back>
		<TextContainer>
		  <TextHead>かおる、誕生日おめでとう🎉</TextHead>
		  <TextBody>
			<p> まだ出会って2ヶ月も経っていないけど、出会えて本当によかったと思っているよ。</p>
			<br />
			<p>誕生してくれてありがとう。</p>
			<br />
			<p>これから一緒に色んなところに行ったり、色んなもの食べたり、人生楽しもう😆</p>
		  </TextBody>
		</TextContainer>
	      </Back>

	      <Front>
		<ImgSet>
		  <img src="/images/birthday-img.png" alt="birthday" />
		</ImgSet>
	      </Front>
	    </Card>
	    <Guide>👆カードをタップしてみて</Guide>
	</>
  );
};

export default KaoruBirthday2026;
