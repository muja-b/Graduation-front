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
import CommentCard from "./CommentCard";
const PostCard = ({ text, title, id, author, likes }) => {
  const [user, setUser] = useState([]);
  const [like, setlike] = useState(["like"]);
  const [numLikes, setNumLikes] = useState(likes);
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState("none");
  const [content, setContent] = useState([]);
  const [numberOfLikes, setNumberOfLikes] = useState([likes]);
  useEffect(() => {
    requestUser();
    requestComments();
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  };
  async function increaseLikes() {
    const res = await fetch(`https://localhost:7241/Post/Like?postId=${id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function addComment() {
    const res = await fetch(`https://localhost:7241/Comments`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "0",
        postId: `${id}`,
        content,
        author: "1",
      }),
    });

    const json = await res.json();
  }

  async function requestComments() {
    const res = await fetch(`https://localhost:7241/Comments?PostId=${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    console.log(json);
    setComments(json);
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
      <div className="post">
        <table style={{ width: "100%" }}>
          <tr style={{ height: "20px", borderBottom: "1pt solid black" }}>
            <th>
              <h4 style={{ fontSize: "40px", textAlign: "right" }}>{title}</h4>
            </th>
            <th style={{ width: "40px" }}>
              <Link to={`/user/${user.id}`}>
                <MDBCard
                  style={{
                    width: "100px",
                    height: "110px",
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
                    <p
                      className="text-muted mb-1"
                      style={{ fontSize: "20px", marginTop: "5px" }}
                    >
                      {user.firstName + " "}
                      {user.lastName}
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </th>
          </tr>
          <tr>
            <div style={{ textAlign: "right" }}>
              <h4 style={{ marginTop: "10px" }}>{text}</h4>
            </div>
          </tr>
          <tr
            style={{
              height: "20px",
              marginLeft: "20px",
            }}
          >
            <th
              style={{ marginRight: "20px" }}
              onClick={() => {
                if (show === "none") {
                  setShow("block");
                } else {
                  setShow("none");
                }
              }}
              className="comments"
            >
              <p style={{ textAlign: "right" }}>
                {" "}
                <img
                  src={process.env.PUBLIC_URL + `/image/comments.png`}
                  alt="hi"
                  className="like"
                ></img>{" "}
                التعليقات
              </p>
            </th>
            <th style={{ marginRight: "20px" }}>
              <p
                style={{ textAlign: "center" }}
                onClick={() => {
                  if (like === "like") {
                    setlike("liked");
                    setNumberOfLikes(likes++);
                    increaseLikes();
                  } else {
                    setlike("like");
                    setNumberOfLikes(likes--);
                  }
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + `/image/` + like + `.png`}
                  alt="hi"
                  className="like"
                ></img>
                {ConvertToArabicNumbers(numberOfLikes)}
              </p>
            </th>
          </tr>
        </table>
      </div>
      <div className="comm" style={{ display: `${show}` }}>
        <table>
          {comments.map((comment) => (
            <tr>
              <th
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <CommentCard
                  key={comment.id}
                  id={comment.id}
                  author={comment.author}
                  content={comment.content}
                />
              </th>
            </tr>
          ))}
          <th>
            <input
              className="form-control mt-1"
              type="text"
              id="content"
              name="content"
              style={{
                width: "600",
                height: "50px",
                textAlign: "right",
                marginLeft: "25px",
              }}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
            ></input>
          </th>
        </table>
      </div>
    </div>
  );
};
export default PostCard;
