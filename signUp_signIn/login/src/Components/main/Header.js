import React from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";

const Header = () => {
  return (
    <div className="header">
      <table>
        <tr>
          <h1>
            <KeyboardAltIcon fontSize="large" />
            *كلمة
          </h1>
        </tr>
        <tr>
          <span className="sub-header">
            an elegant typing experience, just start typing
          </span>
        </tr>
      </table>
    </div>
  );
};

export default Header;
