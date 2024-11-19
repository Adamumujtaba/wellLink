import styled from "styled-components";
import { logout, useUserSlice } from "./redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button/button";
import Logo from "@/assets/react.svg";

function Header() {
  const { user, token } = useUserSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeBackHome = () => {
    navigate("/");
  };
  return (
    <div>
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
            title="Logout"
          />
        )}
      </Nav>
    </div>
  );
}

export default Header;

export const Nav = styled.div`
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
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
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
