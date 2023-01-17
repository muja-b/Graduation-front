import LessonCard from "./LessonCard";
import { useState, useEffect } from "react";
import User from "./User";
const TestWinBox = ({ show, wpm }) => {
  // eslint-disable-line react-hooks/exhaustive-deps
  const [result, setResult] = useState([]);
  useEffect(() => {
    udpateStats();
  }, []);
  async function udpateStats() {
    const res = await fetch(`http://localhost:8081/user?id=2&wpm=${wpm}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setResult(json);
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
              <p className="dialog__description">لقد اتممت الاختبار بنجاح</p>
            </tr>
            <tr>
              {" "}
              <p>السرعة:{wpm}</p>
            </tr>
            <tr>التعديل:{result.flag}</tr>
            <tr>التقدم الحالي:{result.progress}</tr>
          </table>
        </div>
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
        </div>
      </div>
    </div>
  );
};
export default TestWinBox;
