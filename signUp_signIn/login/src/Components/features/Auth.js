import React, { useState, useRef,useEffect } from "react";
import { Navigate, redirect, Route, Routes  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchParams from "../main/SearchParams";
import Details from "../main/Details";
import App from "../../App.css";
import Lesson from "../main/Lesson";

export default function (props) {
  const [authMode, setAuthMode] = useState("signin");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleClick=async  (e)=>{
      e.preventDefault();
      try{
        const response = await fetch(
         "https://localhost:7097/TouchTyping/Authentication/Login",
         {
           method: "POST",
           body: JSON.stringify({
            email,
             password,
             
          }),
          headers: {
             "Content-Type": "application/json",
           },
         }
      );
       const result =await response.json();
       if (result.success===false) {
          navigate('/')
       }
       if(result.token){
        localStorage.setItem("token",JSON.stringify(result))  
        console.log("result is: ", JSON.stringify(result));
         setIsLoggedIn(true);
        //window.location.assign('http://localhost:3000/lessons')
       } 
      }  
     catch (err) {console.log(err)}};
    useEffect(() => {
      if (isLoggedIn) {
      navigate("/lessons");
    }
    }, [isLoggedIn]);

  const handleClickSignUp = async (e) => {
          const firstName=fullName.split(" ")[0];
          const lastName=fullName.split(" ")[1];
    try {
      e.preventDefault();
      const response = await fetch(
        "https://localhost:7097/TouchTyping/Authentication/SignUp",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            firstName,
             lastName
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }else{
        localStorage.setItem("token",JSON.stringify(result,null,4))
        setIsLoggedIn(true);
      }
      

      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {}
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                id="1-1"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="1-2"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              id="2-1"
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="2-2"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="2-3"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClickSignUp}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
