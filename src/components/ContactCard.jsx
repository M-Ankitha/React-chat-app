import React from "react";

export default function ContactCard({ val }) {
  return (
    <div>
      <div className="userChat">
        <i className="fa-solid fa-user" style={{ color: "rgb(0, 0, 148)" }}></i>
        <div className="userChatInfo">
          <span>{val.name}</span>
          <p>{val.lastmessage}</p>
        </div>
      </div>
    </div>
  );
}
