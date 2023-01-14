import { useState, useEffect } from "react";
import Results from "./Results";
import Header from "../features/Header";
const SearchParams = () => {
  const [lessons, setlessons] = useState([]);

  useEffect(() => {
    requestCards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div>
      <Header></Header>
      <div className="search-params">
        <Results lessons={lessons} />
      </div>
    </div>
  );
};

export default SearchParams;
