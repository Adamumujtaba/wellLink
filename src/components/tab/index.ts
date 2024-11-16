import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background: #fff; */
  padding: 10px;
  width: 100%;
`;

export const TabButton = styled.div<{ active: boolean }>`
  width: 45%;
  /* width: 100px; */
  height: 30px;
  // border-radius: 5px;
  /* background: ${(props) => (props.active ? "#125f3a" : "#F3FAF5")}; */
  background: ${(props) => (props.active ? "#3e98c7" : "#dde1e7")};
  border-radius: 4px;
  color: ${(props) => (props.active ? "#fff" : "#4F5D75")};
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const TabPanel = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`;
