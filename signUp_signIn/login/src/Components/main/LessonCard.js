import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const LessonCard = ({ name, text, image, id }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    requestUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
  async function requestUser() {
      const user=await getuserid()
      const userid=user.id
    const res = await fetch(`http://localhost:8081/user/${userid}`, {
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

  let lock =
    "https://cdn.discordapp.com/attachments/900326066852339722/1046413355365187604/unlocked.jpg";
  if (id > user.progress) {
    lock =
      "https://cdn.discordapp.com/attachments/900326066852339722/1046413355075784834/locked.jpg";
  }
  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };

  if (id <= user.progress) {
    return (
      <Link to={`/details/${id}`} className="card">
        <div>
          <table width="100%">
            <tr>
              <th>
                <h3>{ConvertToArabicNumbers(id)}</h3>
              </th>
              <th>
                <img src={lock} alt={name} className="img-lock" />
              </th>
            </tr>
          </table>
          <img src={image} alt={name} className="img-blablabla" />
          <div className="container">
            <h4>{name}</h4>
          </div>
        </div>
      </Link>
    );
  } else
    return (
      <div className="card">
        <table width="100%">
          <tr>
            <th>
              <h3>{ConvertToArabicNumbers(id)}</h3>
            </th>
            <th className="th-left">
              <img src={lock} alt={name} className="img-lock" />
            </th>
          </tr>
        </table>
        <img src={image} alt={name} className="img-blablabla" />
        <div className="container">
          <h4>{name}</h4>
        </div>
      </div>
    );
};
export default LessonCard;
