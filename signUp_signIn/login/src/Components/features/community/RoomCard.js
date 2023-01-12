import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const RoomCard = ({ name, text, id, ownerId, ownerName }) => {
  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };

  return (
    <Link to={`/room/${id}`} className="room">
      <div style={{ marginTop: "8px" }}>
        <table
          style={{
            width: "1200px",
          }}
        >
          <tr style={{}}>
            <th style={{ textDecoration: "none" }}>
              {" "}
              <Link style={{ textDecoration: "none" }} to={`/user/${ownerId}`}>
                صاحب الدرس:{ownerName}
              </Link>
            </th>
            <th style={{ position: "absolute", right: "400px" }}>
              <th>{name}</th>
              <th>{":" + ConvertToArabicNumbers(id)}</th>
            </th>
          </tr>
        </table>
      </div>
    </Link>
  );
};
export default RoomCard;