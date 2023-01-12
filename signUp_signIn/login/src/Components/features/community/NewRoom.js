import { useState, useEffect } from "react";
const NewRoom = ({ show }) => {
  //   const [name, setName] = useEffect();

  //   const [text, setText] = useEffect();
  //   const [pub, setPub] = useEffect();

  //   async function addRoom() {
  //     const res = await fetch(
  //       `http://localhost:8081/com?name=${name}&text=${text} نعسان&ownerId=2&pub=${pub}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const json = await res.json();
  //   }

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
              <p className="dialog__description">لقد اتممت الدرس بنجاح</p>
            </tr>
            <tr>
              <p>السرعة:</p>
            </tr>
          </table>
        </div>
        <hr />

        <div className="dialog__footer">
          <button className="dialog__confirm">التالي</button>
          <button className="dialog__confirm">اعد المحاولة</button>
        </div>
      </div>
    </div>
  );
};
export default NewRoom;
