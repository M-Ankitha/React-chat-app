import React, { useState, useRef, useEffect } from "react";

//top navbar
import Navbar from "../components/Navbar";

import MessageCard from "../components/MessageCard";

import ContactCard from "../components/ContactCard";

import { useDispatch, useSelector } from "react-redux";

export default function Chat() {
  //data from search tab is assigned into search term
  const [searchTerm, setSearchTerm] = useState("");

  const bottomRef = useRef(null);

  //when selecting a contact,,that contact is assigned to currentToUser
  const [currentToUser, setCurrentToUser] = useState("Alan");

  //data from send message input is assigned into message state
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  //handle submit function handles when input message is send
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      time: Date.now(),
      message,
      fromUser: "Alan",
      toUser: currentToUser,
    };

    //the message data is added to the message list

    dispatch({ type: "ADD", payload: data });

    //reseting the message state
    setMessage(" ");
  };

  //messagelist is taken back from store
  const messageList = useSelector((state) => state);

  //find last message function find the last message of contact peoples
  //message list is sorted by time
  //then only message that are between from user and to user is taken out
  //then the last message between them is returned back
  function findLastMessage(user) {
    const message = messageList
      .sort((a, b) => {
        return a.time - b.time;
      })
      .filter((val) => {
        if (
          val.toUser.toLowerCase().includes(user.toLowerCase()) ||
          val.fromUser.toLowerCase().includes(user.toLowerCase())
        ) {
          return val;
        }
        else{
          return null;
        }
      })
      .map((val, key) => {
        return val.message;
      });

    const lastMessage = message.slice(-1)[0];

    return lastMessage;
  }

  //Contact list contains the contact peoples and their last messages
  const ContactList = [
    
    {
      name: "Alan",
      lastmessage: findLastMessage("Carol"),
    },

    {
      name: "Bob",
      lastmessage: findLastMessage("Alan"),
    },
    {
      name: "Carol",
      lastmessage: findLastMessage("Dean"),
    },
    
    {
      name: "Dean",
      lastmessage: findLastMessage("Elin"),
    },
    {
      name: "Elin",
      lastmessage: findLastMessage("Bob"),
    },
    
  ];

  useEffect(() => {
    // scroll to bottom every time messages change and current to user changes
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, currentToUser]);

  return (
    <div>
      {/**top navbar */}
      <Navbar />

      <div className="container">
        <div className="row">
          {/**chat section */}

          <div className="col-9 ">
            {/**below nav bar after top navbar*/}

            <nav className="navbar navbar-light bg-light ">
              <button className="navbar-brand ">
                <i className="fa-solid fa-crown  "></i>
                &ensp; {currentToUser}
              </button>
            </nav>

            {/**messageContainer */}
            <div className="messageContainer">
              {/**messages are show inside the message card */}
              <MessageCard currentToUser={currentToUser} />

              {/**bottom ref helps in auto scroll to bottom when new messages are appearing*/}
              <div ref={bottomRef} />
            </div>
          </div>

          {/**right side search section*/}
          <div className="col-3">
            <nav className="navbar navbar-light bg-light">
              <div className="input-group rounded">
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search"></i>
                </span>

                {/**upper search tab */}
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search contact..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
            </nav>
            {
            ContactList.filter((val) => {
              
                /**search function is implemented here */
              
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
              else{
                return null;
              }
            }).map((val, key) => {
              return (
                /*** when selecting a contact peoples thier name is assigned into current to user */
                <div
                  className="chats"
                  onClick={() => {
                    setCurrentToUser(val.name);
                  }}
                >
                  {/**contact list is mapped ,,so contact peoples name and their last message is displayed
                   */}
                  <ContactCard val={val} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/**bottom input message and send message button  */}

      <nav className="navbar navbar-light bg-dark fixed-bottom">
        <div className="container">
          <form className="container-fluid input" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type message..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button className="btn btn-outline-secondary ">Send</button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

//auto scroll to bottom when new messages are appearing
//https://bobbyhadz.com/blog/react-scroll-to-bottom
//https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
