import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { logout, useUserSlice } from "./redux/auth/authSlice";
import { useDispatch } from "react-redux";
import Button from "./components/Button/button";

export const DoctorsLayout = () => {
  const { user, token } = useUserSlice();
  const dispatch = useDispatch();
  return (
    <>
      <Nav>
        <h4>WellLink</h4>
        {user && token && (
          <StyledButton
            onClick={() => {
              dispatch(logout());
            }}
            title="Logout"
          />
        )}
      </Nav>
      <div
        style={{
          width: "95%",
          margin: "auto",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export const Nav = styled.main`
  margin: 20px auto;
  width: 95%;
  background: #dde1e7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  p {
    text-decoration: underline;
  }
  h4::first-letter {
    color: #3e98c7;
    font-size: 2em;
  }
`;

const StyledButton = styled(Button)`
  background: #dde1e7;
  width: 100px;
  color: red;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);

  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
`;
