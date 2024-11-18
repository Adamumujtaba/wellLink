import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/Button/button";
import { logout, useUserSlice } from "./redux/auth/authSlice";
import { useDispatch } from "react-redux";
import Logo from "@/assets/react.svg";

export const Layout = () => {
  const { user, token } = useUserSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeBackHome = () => {
    navigate("/");
  };
  return (
    <>
      <Nav>
        <h4 onClick={routeBackHome}>
          <img width={"25px"} src={Logo} />
          <span className="title">WellLink</span>
        </h4>
        {user && token && (
          <StyledButton
            onClick={() => {
              dispatch(logout());
            }}
            title={`Logout`}
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
  h4 {
    background: #dde1e7;
    box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);

    display: flex;
    align-items: center;
    justify-content: start;
    width: 110px;
    border-radius: 5px;
    .title::first-letter {
      color: #3e98c7 !important;
      font-size: 1.5em !important;
    }
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
