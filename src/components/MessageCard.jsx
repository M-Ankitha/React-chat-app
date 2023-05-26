import React from "react";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

export default function MessageCard({ currentToUser }) {
  //message list data are taken from store
  const messageList = useSelector((state) => state);

  return (
    <div>
      <div>
        {/**first message list is sorted by time 
  then only message that are between from user(Ankitha) and to user is taken out and then its displayed*/}
        {messageList
          .sort((a, b) => {
            return a.time - b.time;
          })
          .filter((val) => {
            if (
              val.toUser.toLowerCase().includes(currentToUser.toLowerCase()) ||
              val.fromUser.toLowerCase().includes(currentToUser.toLowerCase())
            ) {
              return val;
            }
            else{
              return null;
            }
          })
          .map((contact) => {
            return (
              <div
                className="messageCard"
                style={
                  contact.fromUser === "Ankitha"
                    ? { alignItems: "flex-end" }
                    : { alignItems: "flex-start" }
                }
              >
                <Card
                  border="secondary"
                  style={{
                    width: "18rem",
                    marginRight: "50px",
                    marginLeft: "50px",
                  }}
                  className="mb-3 "
                >
                  <Card.Body>
                    <Card.Text>{contact.message}</Card.Text>
                    <Card.Footer>
                      <small className="text-muted messageFooter">
                        message sent by {contact.fromUser} to {contact.toUser}{" "}
                        at {contact.time}milli seconds ago
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
