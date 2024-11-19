import styled from "styled-components";
// import Lottie from "lottie-react";
import { Danger, HeartTick, UserSquare, Warning2 } from "iconsax-react";
import { thousandFormatter } from "@/utils/utils";

interface cardProps {
  title: string;
  total: number;
  type: "risk" | "caution" | "total" | "stable";
}
function StatsCard({ title, total, type }: cardProps) {
  return (
    <Card status={type}>
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "40px",
            transition: "color 0.3s ease-in-out",
            fontFamily: "monospace",
          }}
        >
          {thousandFormatter(total ?? 0)}
        </p>
        <p
          style={{
            bottom: 20,
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {title}
        </p>
      </div>
      <div className="icon">
        {type === "risk" && <Danger size={34} />}
        {type === "total" && <UserSquare size={34} />}
        {type === "stable" && <HeartTick size={34} />}
        {type === "caution" && <Warning2 size={34} />}
      </div>
    </Card>
  );
}

export default StatsCard;

interface CardProps {
  status: string;
}
const Card = styled.div<CardProps>`
  /* position: relative; */
  max-width: 170px;
  width: 100%;
  height: 150px;
  background: #dde1e7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  position: relative;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: ${({ status }) =>
    status === "total"
      ? "#000"
      : status === "paid"
      ? "#DCEDE5"
      : status === "caution"
      ? "#E5B804"
      : status === "risk"
      ? "#FF3D00"
      : "#125f3a"};
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    bottom: 20px;
  }

  @media (max-width: 600px) {
    max-width: 95%;
    margin: 0px auto;
    padding: 0px 5px;
  }
`;
