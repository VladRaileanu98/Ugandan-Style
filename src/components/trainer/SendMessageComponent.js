import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import MessageService from "../../services/MessageService";
import UserService from "../../services/UserService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Popup.css";

const SendMessageComponent = () => {
  const [popup, setPop] = useState(false);
  const [time, setTime] = useState("10:28");
  const [content, setContent] = useState();
  const [senderId, setSender] = useState();
  const [receiverId, setReceiver] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [aValue, setAValue] = useState();

  var today = new Date();
  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };

  const saveMessage = () => {
    const messageEntity = { content, senderId, receiverId, time };
    //setContent(val);
    //setSender(window.localStorage.getItem("user_id"));
    //setReceiver(aValue);
    //setTime("10:44");
    console.log(content);
    console.log(time);
    console.log("sender id: " + window.localStorage.getItem("user_id"));
    console.log("receiver id: " + aValue);
    MessageService.createMessage(messageEntity)
      .then((response) => {
        console.log(
          "response din save message" + JSON.stringify(response.data)
        );
        setPop(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    alert("succesfully sent private message");
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
              <div>
                <Select
                  name="select"
                  options={items}
                  labelField="name"
                  valueField="id"
                  onChange={(items) => setAValue(items[0].id)}
                ></Select>
              </div>

              <div className="form-group mt-1 ">
                <input
                  type="text"
                  placeholder="Enter message content"
                  name="content"
                  className="form-control"
                  onChange={(e) => {
                    setContent(e.target.value);
                    setSender(window.localStorage.getItem("user_id"));
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
                  }}
                ></input>
              </div>
              <div class="container">
                <div className="text-center">
                  <button
                    onClick={saveMessage}
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
