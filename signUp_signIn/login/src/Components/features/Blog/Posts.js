import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../features/Header";
import PostCard from "./PostCard";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    requestCards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function addPost() {
    const res = await fetch(`https://localhost:7241/Post`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "0",
        title,
        content,
        author: "1",
        comments: [],
        likes: "0",
      }),
    });

    const json = await res.json();
  }

  async function requestCards() {
    const res = await fetch(`https://localhost:7241/Post`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    setPosts(json);
  }

  return (
    <div>
      <Header></Header>
      <div className="search-params">
        <table>
          <tr>
            <th>
              <input
                className="form-control mt-1"
                type="text"
                id="title"
                name="title"
                style={{
                  width: "200px",
                  height: "50px",
                  textAlign: "right",
                  marginLeft: "25px",
                  marginTop: "20px",
                }}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </th>

            <th>العونان</th>
            <th>
              <button
                onClick={() => {
                  addPost();
                  window.location.reload();
                }}
              >
                انشر
              </button>
            </th>
          </tr>
          <tr>
            <textarea
              className="form-control mt-1"
              type="text"
              id="content"
              name="content"
              style={{
                width: "800px",
                height: "150px",
                textAlign: "right",
                marginLeft: "25px",
              }}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </tr>
          {posts.map((post) => (
            <tr>
              <PostCard
                key={post.name}
                id={post.id}
                title={post.title}
                author={post.author}
                text={post.content}
                likes={post.likes}
              />{" "}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Posts;
