import LessonCard from "./LessonCard";
import { useState, useEffect } from "react";
const winBox = ({ show, wpm, statsCharCount, id }) => {
  // eslint-disable-line react-hooks/exhaustive-deps

  async function udpateStats() {
    const res = await fetch(
      `http://localhost:8081/user/2?wpm=${wpm}&progress=${id + 1}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    console.log(json);
  }

  if (show === false) {
    return <></>;
  }
  return (
    <div className="overlay">
      <div className="dialog">
        <div
          className="dialog__content"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            textAlign: "right",
          }}
        >
          <table>
            <tr>
              <h2 className="dialog__title">احسنت</h2>
            </tr>
            <tr>
              <p className="dialog__description">لقد اتممت الدرس بنجاح</p>
            </tr>
            <tr>
              {" "}
              <p>السرعة:{wpm}</p>
            </tr>
          </table>
        </div>
        <hr />

        <div className="dialog__footer">
          <button
            className="dialog__confirm"
            onClick={() => {
              udpateStats();
              window.location.replace("http://localhost:3000/lessons");
            }}
          >
            التالي
          </button>
          <button
            className="dialog__confirm"
            onClick={() => {
              udpateStats();
              window.location.reload();
            }}
          >
            اعد المحاولة
          </button>
        </div>
      </div>
    </div>
  );
};
export default winBox;
