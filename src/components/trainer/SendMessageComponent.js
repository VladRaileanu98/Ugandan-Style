import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import MessageService from "../../services/MessageService";
import UserService from "../../services/UserService";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Popup.css";

const SendMessageComponent = () => {
  const [popup, setPop] = useState(false);
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [aValue, setAValue] = useState();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };
  var today = new Date();
  const saveMessage = (e) => {
    //e.preventDefault();
    const messageEntity = { content, sender, receiver, time };
    setContent(e);
    setSender(1);
    setReceiver(aValue);
    setTime(
      today.getFullYear() +
        "/" +
        today.getMonth() +
        "/" +
        today.getDate() +
        "  " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds()
    );
    MessageService.createMessage(messageEntity)
      .then((response) => {
        console.log(
          "response din save message" + JSON.stringify(response.data)
        );
        setPop(false);
        //navigate(`/homepage`);
        //console.log("this is the course id: " + id);
        //console.log("this is the quiz id: " + response.data.id);
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUsers();
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const items = users?.map((user) => {
    return { id: user.id, name: user.username };
  });

  return (
    <div>
      <button onClick={handleClickOpen}>Open popup</button>
      <div>
        {popup ? (
          <div className="main">
            <div className="popup">
              <div className="popup-header text-center">
                <h1>Send a message</h1>
                <h1 onClick={closePopup}>X</h1>
              </div>
              <div class="text-center">
                <p>- select the user and send the message -</p>
              </div>
              <Select
                name="select"
                options={items}
                labelField="name"
                valueField="id"
                onChange={(items) => setAValue(items[0].id)}
              ></Select>
              <div className="form-group mt-1 ">
                <input
                  type="text"
                  placeholder="Enter message content"
                  name="content"
                  className="form-control"
                  value={content}
                  onChange={(e) => saveMessage(e.target.value)}
                ></input>
              </div>
              <div class="container">
                <div className="text-center">
                  <button
                    onClick={() => navigate(`/course/showAll`)}
                    className="rounded bg-slate-800 text-white px-6 py-2 font-semibold"
                  >
                    send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SendMessageComponent;
