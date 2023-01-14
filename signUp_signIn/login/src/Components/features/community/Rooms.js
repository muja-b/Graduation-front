import { useState, useEffect } from "react";
import Header from "../Header";
import NewRoom from "./NewRoom";
import RoomResults from "./RoomResults";
const Rooms = () => {
  const [lessons, setlessons] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    addRoom();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function addRoom() {
    let type = document.getElementById("type").value;
    const res = await fetch(`http://localhost:8081/com/${type}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    setlessons(json.lessons);
  }

  return (
    <div>
      <Header></Header>
      <NewRoom show={show}></NewRoom>
      <div
        className="search-params"
        style={{ position: "absolute", top: "50px", right: "200px" }}
      >
        <button
          onClick={() => {
            setShow(true);
          }}
          style={{ position: "absolute", top: "-60px", left: "200px" }}
        >
          {" "}
          درس جديد
        </button>
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "30px",
            height: "40px",
            width: "120px",
          }}
        >
          :فلتر
        </div>
        <select
          name="type"
          id="type"
          className="form-control mt-1"
          style={{
            position: "absolute",
            top: "-60px",
            right: "160px",
            height: "40px",
            width: "120px",
            textAlign: "right",
          }}
          onChange={() => {
            addRoom();
          }}
        >
          <option value="1">الاقدم</option>
          <option value="2">الاحدث</option>
          <option value="3">الاكثر شعبية</option>
        </select>
        <RoomResults lessons={lessons} />
      </div>
    </div>
  );
};

export default Rooms;
