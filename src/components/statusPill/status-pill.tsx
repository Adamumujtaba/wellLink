import React from "react";
import styled from "styled-components";

interface StatusConfig {
  background: string;
  color: string;
  dotColor: string;
}

const getStatusStyles = (status: boolean): StatusConfig => {
  switch (status) {
    case true:
      return {
        background: "#e7faec",
        color: "#42d452",
        dotColor: "#42d452",
      };
    case false:
      return {
        background: "#edfafd",
        color: "#3b9eac",
        dotColor: "#3b9eac",
      };
    default:
      return {
        background: "#F1F1F1",
        color: "#666666",
        dotColor: "#666666",
      };
  }
};

interface StatusIndicatorProps {
  status?: boolean;
}

const StatusCard: React.FC<StatusIndicatorProps> = ({ status }: StatusIndicatorProps) => {
  const styles = getStatusStyles(status ?? false);
  return (
    <StatusPill background={styles.background} color={styles.color} dotColor={styles.dotColor}>
      {status === true ? "Approved" : "Pending"}
    </StatusPill>
  );
};

interface StatusPillProps {
  background: string;
  color: string;
  dotColor: string;
}

const StatusPill = styled.div<StatusPillProps>`
  display: inline-flex;
  align-items: center;
  padding: 5x;
  border-radius: 16px;
  font-size: 12px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  width: fit-content;
  min-width: 70px;
  justify-content: center;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${(props) => props.dotColor};
  }
`;

export default StatusCard;
