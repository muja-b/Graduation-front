import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
const CommentCard = ({ content, id, author }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    requestUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestUser() {
    const res = await fetch(`http://localhost:8081/user/${author}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    // console.log(json);
    setUser(json);
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
      <div className="comment">
        <table style={{ width: "100%" }}>
          <tr
            style={{
              height: "20px",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <th>
              <Link to={`/user/${user.id}`}>
                <th>
                  <MDBCard
                    style={{
                      width: "80px",
                      height: "80px",
                      position: "relative",
                    }}
                  >
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={user.profilePicture}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "50px" }}
                        fluid
                      />
                    </MDBCardBody>
                  </MDBCard>
                </th>
              </Link>
              <th>
                <p
                  className="text-muted mb-1"
                  style={{ fontSize: "20px", marginTop: "5px" }}
                >
                  {user.firstName + " "}
                  {user.lastName}
                </p>
              </th>
            </th>
            <th marginTop="20px">
              <p>{content}</p>
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default CommentCard;
