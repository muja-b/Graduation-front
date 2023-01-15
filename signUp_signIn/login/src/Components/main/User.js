import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import Header from "../features/Header";
const User = () => {
  const [user, setUser] = useState([]);
  let url = window.location.href.split("/");
  let id = url[4];
  useEffect(() => {
    requestUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestUser() {
    const res = await fetch(`http://localhost:8081/user/${id}`, {
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
  let s30 = process.env.PUBLIC_URL + `/progress/30c.png`;
  let s60 = process.env.PUBLIC_URL + `/progress/60c.png`;
  let s90 = process.env.PUBLIC_URL + `/progress/90c.png`;
  let s120 = process.env.PUBLIC_URL + `/progress/120c.png`;

  let wpm = user.highestWPM;
  if (wpm >= 30) {
    s30 = process.env.PUBLIC_URL + `/progress/30o.png`;
  }
  if (wpm >= 60) {
    s60 = process.env.PUBLIC_URL + `/progress/60o.png`;
  }
  if (wpm >= 90) {
    s90 = process.env.PUBLIC_URL + `/progress/90o.png`;
  }
  if (wpm >= 120) {
    s120 = process.env.PUBLIC_URL + `/progress/120o.png`;
  }

  let p25 = process.env.PUBLIC_URL + `/progress/25c.png`;
  let p50 = process.env.PUBLIC_URL + `/progress/50c.png`;
  let p75 = process.env.PUBLIC_URL + `/progress/75c.png`;
  let p100 = process.env.PUBLIC_URL + `/progress/100c.png`;

  let progress = user.progress;
  if (progress >= 25) {
    p25 = process.env.PUBLIC_URL + `/progress/25o.png`;
  }
  if (progress >= 50) {
    p50 = process.env.PUBLIC_URL + `/progress/50o.png`;
  }
  if (progress >= 75) {
    p75 = process.env.PUBLIC_URL + `/progress/75o.png`;
  }
  if (progress >= 100) {
    p100 = process.env.PUBLIC_URL + `/progress/100o.png`;
  }

  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };

  return (
    <div>
      <Header></Header>
      <div className="userPage">
        <div
          style={{
            display: "fixed",
            backgroundColor: "rgb(240, 228, 228)",
            width: "1200px",
            height: "800px",
            alignItems: "center",
            right: "200px",
          }}
        >
          <MDBContainer
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              width: "100%",
              height: "100%",
            }}
          >
            <MDBCol>
              <MDBRow>
                <MDBCard style={{ width: "300px", height: "400px" }}>
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={user.profilePicture}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "200px" }}
                      fluid
                    />
                    <p
                      className="text-muted mb-1"
                      style={{ fontSize: "30px", marginTop: "10px" }}
                    >
                      {user.firstName + " "}

                      {user.lastName}
                    </p>
                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: "20px", marginTop: "10px" }}
                    >
                      {user.email}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn outline className="ms-1">
                        Message
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBRow>
              <MDBRow>
                <MDBCard style={{ width: "300px", height: "300px" }}>
                  <MDBCardBody className="text-center">
                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: "40px", marginTop: "10px" }}
                    >
                      اقصى سرعة:{ConvertToArabicNumbers(wpm)}
                    </p>

                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: "40px", marginTop: "10px" }}
                    >
                      ٪التقدم:{ConvertToArabicNumbers(progress)}
                    </p>
                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: "40px", marginTop: "10px" }}
                    >
                      عدد الدروس:{ConvertToArabicNumbers(progress)}
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <MDBCol>
                  <MDBCard
                    style={{
                      width: "750px",
                      height: "100px",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div
                      className="text-muted mb-4"
                      style={{
                        fontSize: "20px",
                        marginTop: "10px",
                        width: "700px",
                        textAlign: "right",
                        marginRight: "15px",
                      }}
                    >
                      {user.description}
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBCard
                    style={{
                      width: "750px",
                      height: "270px",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <h1
                        style={{
                          position: "relative",
                          marginRight: "300px",
                          marginTop: "15px",
                        }}
                      >
                        اقصى سرعة
                      </h1>
                    </div>
                    <table
                      style={{
                        marginleft: "15px",
                        position: "absolute",
                        marginTop: "75px",
                      }}
                    >
                      <tr>
                        <th style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={s120}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </th>
                        <th style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={s90}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </th>
                        <th style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={s60}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </th>
                        <th style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={s30}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </th>
                      </tr>
                    </table>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBCard
                    style={{
                      width: "750px",
                      height: "270px",
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginRight: "20px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <h1
                        style={{
                          position: "relative",
                          marginRight: "350px",
                          marginTop: "15px",
                        }}
                      >
                        تقدم
                      </h1>
                    </div>

                    <table
                      style={{
                        marginleft: "15px",
                        position: "absolute",
                        marginTop: "75px",
                      }}
                    >
                      <tr></tr>
                      <tr>
                        <td style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={p100}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </td>
                        <td style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={p75}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </td>
                        <td style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={p50}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </td>
                        <td style={{ padding: "0 20px 0 15px" }}>
                          <MDBCardImage
                            src={p25}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </td>
                      </tr>
                    </table>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};
export default User;
