import { useState, useEffect } from "react";
import NewRoom from "./NewRoom";
import RoomResults from "./RoomResults";
const Rooms = () => {
  const [lessons, setlessons] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestCards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestCards() {
    const res = await fetch(`http://localhost:8081/com/1`, {
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
      <div className="search-params">
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          {" "}
          درس جديد
        </button>
        <NewRoom show={show}></NewRoom>
        <RoomResults lessons={lessons} />
      </div>
    </div>
  );
};

export default Rooms;
