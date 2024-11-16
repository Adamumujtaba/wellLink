import styled from "styled-components";
// import Lottie from "lottie-react";
import { UserSquare } from "iconsax-react";
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
          }}
        >
          {thousandFormatter(total ?? 0)}
        </p>
        <p
          style={{
            bottom: 20,
            fontWeight: "bold",
            fontSize: "24px",
            color: "#fff",
          }}
        >
          {title}
        </p>
      </div>
      <div className="icon">
        <UserSquare size={35} />
      </div>
    </Card>
  );
}

export default StatsCard;

interface CardProps {
  status: string;
}
const Card = styled.div<CardProps>`
  position: relative;
  max-width: 150px;
  height: 150px;
  background: ${({ status }) =>
    status === "total"
      ? "#000"
      : status === "paid"
      ? "#DCEDE5"
      : status === "caution"
      ? "#E5B804"
      : status === "risk"
      ? "#FF3D00"
      : "#125f3a"};
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  .icon {
    /* background: red; */
  }
`;
