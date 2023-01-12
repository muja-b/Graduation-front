import React, { useState, useRef } from "react";
import { Navigate, redirect, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchParams from "../main/SearchParams";
import Details from "../main/Details";
import App from "../../App.css";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    emailinputRef.current.value = "";
    passwordinputRef.current.value = "";
    emailinputRefsignup.current.value = "";
    passwordinputRefsignup.current.value = "";
  };
  const [err, setErr] = useState("");
  const emailinputRef = useRef(null);
  const passwordinputRef = useRef(null);
  const emailinputRefsignup = useRef(null);
  const passwordinputRefsignup = useRef(null);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://localhost:7097/TouchTyping/Authentication/Login",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailinputRef.current.value,
            password: passwordinputRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {}
  };
  const handleClickSignUp = async () => {
    try {
      const response = await fetch(
        "https://localhost:7097/TouchTyping/Authentication/SignUp",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailinputRefsignup.current.value,
            password: passwordinputRefsignup.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

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
                ref={emailinputRef}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="1-2"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                ref={passwordinputRef}
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
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="2-2"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              ref={emailinputRefsignup}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="2-3"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              ref={passwordinputRefsignup}
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
