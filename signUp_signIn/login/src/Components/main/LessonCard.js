import { Link } from "react-router-dom";
const LessonCard = ({ name, text, image, id }) => {
  let lock =
    "https://cdn.discordapp.com/attachments/900326066852339722/1046413355365187604/unlocked.jpg";
  if (id >= 1) {
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

  if (id < 1) {
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
