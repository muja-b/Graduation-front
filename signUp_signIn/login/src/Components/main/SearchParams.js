import { useState, useEffect } from "react";
import Results from "./Results";
import Header from "../features/Header";
import { Link, NavLink } from "react-router-dom";
const SearchParams = () => {
  const [lessons, setlessons] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    requestCards();
    requestUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestUser() {
    const res = await fetch(`http://localhost:8081/user/1`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    console.log(json);
    setUser(json);
  }

  async function requestCards() {
    console.log("lessons");
    const res = await fetch(`http://localhost:8081/`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    setlessons(json.lessons);
    console.log("lessons");
  }

  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };

  return (
    <div className="tooop">
      <Header></Header>

      <div
        style={{
          fontSize: "30px",
          position: "relative",
          marginLeft: "1000px",
          marginTop: "15px",
        }}
      >
        <button
          style={{ marginRight: "20px" }}
          className="test"
          onClick={() => {
            window.location.replace("http://localhost:3000/test");
          }}
        >
          اختبر نفسك
        </button>
        الدرس الحالي:{ConvertToArabicNumbers(user.progress)} التقدم: ٪
        {ConvertToArabicNumbers(Math.round(user.progress / 1.26))}
      </div>
      <div className="search-params">
        <Results lessons={lessons} />
      </div>
    </div>
  );
};

export default SearchParams;
