import React from "react";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Button({
  title,
  onClick,
  style,
  disabled,
  ...rest
}: {
  title?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: any;
  disabled?: boolean;
}) {
  return (
    <ButtonWrapper disabled={disabled} onClick={onClick} style={style} {...rest}>
      {title}
    </ButtonWrapper>
  );
}

export default Button;

const ButtonWrapper = styled.button`
  all: unset;
  padding: 5px;
  border-radius: 4px;
  /* color: #3e98c7; */
  margin: 10px 0px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #dde1e7;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
`;
