import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ReactComponent as Lib } from "../../assets/icons/library.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Explore } from "../../assets/icons/explore.svg";
import { ReactComponent as Rand } from "../../assets/icons/random.svg";
import { ReactComponent as Chat } from "../../assets/icons/chat.svg";

export default function (props) {
  return (
    <nav>
      <div>
        <div
          style={{ display: "flex", flexDirection: "row", alignItems: "left" }}
        >
          <href className="logo">الصفحة الرئيسية </href>
          <div
            className="div-header"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "right",
            }}
          >
            <NavLink to="/">
              <Home className="div-svg" />
            </NavLink>
            <NavLink to="/rooms">
              <Explore className="div-svg" />
            </NavLink>
            <NavLink to="/lessons">
              <Lib className="div-svg" />
            </NavLink>
            <NavLink to="/keyboard">
              <Rand className="div-svg" />
            </NavLink>
            <NavLink to="/">
              <Chat className="div-svg" />
            </NavLink>
            <button
              onClick={localStorage.removeItem("token")}
              className="button-header"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
