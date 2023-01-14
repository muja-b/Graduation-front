import { Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NewRoom = ({ show }) => {
  const navigate = useNavigate();
  async function getuserid(){
    const res=await fetch("https://localhost:7097/TouchTyping/Authentication/Validate",
    {
      method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')).token
        },
    });
    const user=await res.json();
    console.log(user)
    return user
  }
    async function getuserinfo(id){
    const res=await fetch(`http://localhost:8081/user/${id}`,
    {
      method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
    });
    const user=await res.json();
    console.log(user)
    return user
  }
  async function addRoom() {
    const user=await getuserid()
    const userid=user.id
    const userinfo=await getuserinfo(userid)
    const fullName=userinfo.firstName+" "+userinfo.lastName;
    let name = document.getElementById("name").value;
    let text = document.getElementById("text").value;
    let pub = document.getElementById("pub").value;
    const res = await fetch(
      `http://localhost:8081/com/add?name=${name}&text=${text}&ownerId=${userid}&pub=${pub}&ownerName=${fullName}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
    
    const json = await res.json();
    window.location.replace("http://localhost:3000/rooms");
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
