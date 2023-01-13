import { Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
const NewRoom = ({ show }) => {
  async function addRoom() {
    let name = document.getElementById("name").value;
    let text = document.getElementById("text").value;
    let pub = document.getElementById("pub").value;
    const res = await fetch(
      `http://localhost:8081/com/add?name=${name}&text=${text}&ownerId=2&pub=${pub}&ownerName=يزن شتيه`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
  }

  if (show === false) {
    return <></>;
  }
  return (
    <div className="overlay">
      <div className="dialog" style={{ width: "600px", height: "800px" }}>
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
              <h2 className="dialog__title">أضافة درس</h2>
            </tr>
            <tr>
              اسم الدرس
              <input
                className="form-control mt-1"
                type="text"
                id="name"
                name="name"
                style={{ width: "400px", textAlign: "right" }}
              ></input>
            </tr>
            <tr>
              <p>النص الخاص بالدرس</p>
              <textarea
                className="form-control mt-1"
                type="text"
                id="text"
                name="text"
                style={{ width: "400px", height: "300px", textAlign: "right" }}
              ></textarea>
            </tr>
            <tr style={{ display: "flex", flexDirection: "row-reverse" }}>
              <p style={{ marginTop: "12px" }}>:الخصوصية</p>
              <select
                name="pub"
                id="pub"
                className="form-control mt-1"
                style={{ width: "60px" }}
              >
                <option value="true">عام</option>
                <option value="false">خاص</option>
              </select>
            </tr>
          </table>
        </div>
        <hr />

        <div className="dialog__footer">
          <button
            className="dialog__confirm"
            onClick={() => {
              addRoom();
              window.location.replace("http://localhost:3000/rooms");
            }}
          >
            تخزين
          </button>
          <button
            className="dialog__confirm"
            onClick={() => {
              window.location.replace("http://localhost:3000/rooms");
            }}
          >
            الرجوع
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewRoom;
