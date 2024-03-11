import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import styled from "styled-components";

const Spinner = () => {
  const [count, setCount] = useState<string[]>(["", ""]);

  useEffect(() => {
    const canvas = document.getElementById("wheelCanvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    const spinButton = document.getElementById("spinButton");

    const segments = Array.from(String(count), (value) => Number(value));

    console.log(segments);

    function drawWheel() {
      // 섹션별로 나눔
      segments.forEach((segment, index) => {
        const angle = (Math.PI * 2) / segments.length;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          200,
          angle * index,
          angle * (index + 1)
        );
        ctx.fillStyle = index % 2 === 0 ? "red" : "green";
        ctx.fill();
      });

      // 원판 중심
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
    }

    function spinWheel() {
      const spinDuration = 3000; // 돌리는 시간 3초
      const startTimestamp = new Date().getTime();
      const spinFunction = () => {
        const now = new Date().getTime();
        const elapsedTime = now - startTimestamp;

        let progress = elapsedTime / spinDuration; // 0 ~ 1 사이의 진행도
        if (progress >= 1) {
          progress = 1; // 종료 조건
        } else {
          requestAnimationFrame(spinFunction); // 계속 회전
        }

        const angle = progress * 2 * Math.PI * 10; // 0 ~ 10바퀴
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel(); // 변경된 각도로 원판을 다시 그림
        ctx.restore();

        if (progress === 1) {
          // 돌리기 완료
          alert("완료!");
        }
      };

      spinFunction();
    }

    drawWheel();
    spinButton?.addEventListener("click", spinWheel);
  }, [count]);

  return (
    <Container>
      <SpinnerWrapper>
        <Header>원판돌리기</Header>
        <Content>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 10,
              gap: 10,
            }}
          >
            <span>옵션 개수</span>
            <Button>-</Button>
            <span>{count}</span>
            <Button>+</Button>
          </div>
          <div
            style={{
              height: 400,
              backgroundColor: "#EEE7DA",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span>각 판을 선택하여 옵션 내용을 설정해주세요.</span>
              <canvas
                id="wheelCanvas"
                width="300"
                height="300"
                style={{ borderRadius: "100%" }}
              ></canvas>
              <button id="spinButton">돌리기</button>
              <span>{`${count}개 입력중/ 총 ${count}개`}</span>
            </div>
          </div>
        </Content>
      </SpinnerWrapper>
    </Container>
  );
};

export default Spinner;

const SpinnerWrapper = styled.div`
  width: 50%;
  height: 50%;
  #canvas {
    border: 2px solid black;
  }
`;

const Header = styled.div`
  width: auto;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px solid #e9e9ec;
  font-weight: bold;
  font-size: 18px;
`;

const Content = styled.div`
  border: 1px solid #e9e9ec;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
`;

const Button = styled.div`
  width: 27px;
  height: 27px;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000;
  border-radius: 0;
`;
