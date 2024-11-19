import { Outlet } from "react-router-dom";
import Header from "./header";

export const Layout = () => {
  return (
    <>
      <Header />
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
