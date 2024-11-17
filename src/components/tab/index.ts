import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background: #fff; */
  padding: 10px 0px;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
`;

export const TabButton = styled.div<{ active: boolean }>`
  width: 50%;
  height: 30px;
  background: ${(props) => (props.active ? "#3e98c7" : "#dde1e7")};
  border-radius: 4px;
  color: ${(props) => (props.active ? "#fff" : "#4F5D75")};
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const TabPanel = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`;
