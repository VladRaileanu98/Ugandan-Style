import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseService from "../../services/CourseService";
import AuthService from "../../services/auth.service";
import axios, { all } from "axios";
import UserService from "../../services/UserService";
import Select from "react-dropdown-select";
import MessageService from "../../services/MessageService";
import "../trainer/Popup.css";
import Collapsible from "react-collapsible";

function Homepage() {
  const [courses, setCourses] = useState([]);
  const [allcourses, setAllCourses] = useState([]);
  const [userName, setUserName] = useState("");

  const [popup, setPop] = useState(false);
  const [time, setTime] = useState("10:28");
  const [content, setContent] = useState();
  const [senderId, setSender] = useState();
  const [receiverId, setReceiver] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [aValue, setAValue] = useState();
  const [sentMessages, setSentMessages] = useState();
  const [receivedMessages, setReceivedMessages] = useState();

  var today = new Date();
  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };

  const getSent = () => {
    axios
      .get(
        "http://localhost:8080/user/" +
          window.localStorage.getItem("user_id") +
          "/messages-sent"
      )
      .then((response) => {
        setSentMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getReceived = () => {
    axios
      .get(
        "http://localhost:8080/user/" +
          window.localStorage.getItem("user_id") +
          "/messages-received"
      )
      .then((response) => {
        setReceivedMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    //getAllCourses();
    getUserCourses();
    getAllCourses();
    getReceived(window.localStorage.getItem("user_id"));
    getSent(window.localStorage.getItem("user_id"));
    setUserName(window.localStorage.getItem("user_name"));
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

  const getAllCourses = () => {
    CourseService.getCourses()
      .then((response) => {
        setAllCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserCourses = () => {
    axios
      .get(
        "http://localhost:8080/user/showAllCourses/" +
          window.localStorage.getItem("user_id")
      )
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {popup ? (
          <div className="main">
            <div className="popup border-2">
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
                    setTime(today.getHours() + ":" + today.getMinutes());
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
                <div class="bg-white text-black border-2 rounded">
                  <Collapsible trigger="send messages">
                    {sentMessages.map((message) => (
                      <label class="block text-gray-700 bg-slate-200 text-sm  font-bold mb-2">
                        <div className="ml-4">
                          to:{message.receiverId} - {message.time}
                        </div>
                        <div className="ml-4">{message.content} </div>
                      </label>
                    ))}
                  </Collapsible>
                  <Collapsible class="ml-4" trigger="received messages">
                    {receivedMessages.map((message) => (
                      <label class="block text-gray-700 bg-slate-200 text-sm  font-bold mb-2">
                        <div className="ml-4">
                          from:{message.receiverId} - {message.time}
                        </div>
                        <div className="ml-4">{message.content} </div>
                      </label>
                    ))}
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <header>
        <nav class="bg-zinc-300 border-zinc-200 dark:bg-zinc-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
            <a href="https://oracle.com/" class="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8 mr-3"
                alt="Flowbite Logo"
              /> */}

              <span class="text-zinc-900 pl-11 ml-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {window.localStorage.getItem("role")}
              </span>
            </a>
            <div
              class="mr-20 hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-zinc-800 md:dark:bg-zinc-900 dark:border-zinc-700">
                {window.localStorage.getItem("role") === "ROLE_USER" ? (
                  <></>
                ) : (
                  <li>
                    <a
                      href="/user/showAll"
                      class="block py-2 pl-3 pr-4 text-zinc-900 rounded md:bg-emerald-300 hover:bg-gray-100 md:hover:bg-emerald-400 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      users
                    </a>
                  </li>
                )}
                <li>
                  <a
                    onClick={handleClickOpen}
                    class="block py-2 pl-3 pr-4 text-zinc-900 rounded md:bg-emerald-300 hover:bg-gray-100 md:hover:bg-emerald-500 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    messages
                  </a>
                </li>
                <li>
                  <a
                    href="/course/showAll"
                    class="block py-2 pl-3 pr-4 text-zinc-900 rounded md:bg-emerald-400 hover:bg-gray-100 md:hover:bg-emerald-500 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    courses
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <body class="bg-lime-200">
        <div class="min-h-screen from bg-gradient-to-r from-gray-500  to-gray-900 flex justify-center items-center py-3">
          {window.localStorage.getItem("role") === "ROLE_USER" ? (
            <div class="container p-4 bg-gray-100 rounded-xl">
              <h1 class="text-4xl uppercase text-center font-bold from-current mb-8">
                {userName}'s courses
              </h1>
              <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                {courses.map((course) => (
                  <div class="bg-white">
                    <div>
                      <div class="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                        <div>
                          <img class="w-full" src={course.imageLink} />
                          <div class="px-4 py-2">
                            <h1 class="text-xl font-gray-700 font-bold">
                              {course.name}
                            </h1>
                            <div class="flex space-x-2 mt-2">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-7 w-7 text-gray-800"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </span>
                              <h3 class="text-lg text-gray-600 font-semibold mb-2">
                                Bucharest
                              </h3>
                            </div>
                            <p class="text-sm tracking-normal">
                              {course.description}
                            </p>
                            <a
                              href={`/course/${course.id}/lessonpage`}
                              class="text-center block py-2 pl-3 pr-4   rounded md:bg-gray-300 md:text-gray-700 md:p-0 md:hover:bg-gray-400 dark:text-white md:dark:text-blue-500"
                            >
                              {course.quiz != null ? (
                                <div>data</div>
                              ) : (
                                <div>access course</div>
                              )}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div class="container p-4 bg-gray-100 rounded-xl">
              <h1 class="text-4xl uppercase text-center font-bold from-current mb-8">
                All courses
              </h1>
              <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                {allcourses.map((course) => (
                  <div class="bg-white">
                    <div>
                      <div class="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                        <div>
                          <img class="w-full" src={course.imageLink} />
                          <div class="px-4 py-2">
                            <h1 class="text-xl font-gray-700 font-bold">
                              {course.name}
                            </h1>
                            <div class="flex space-x-2 mt-2">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-7 w-7 text-gray-800"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </span>
                              <h3 class="text-lg text-gray-600 font-semibold mb-2">
                                Bucharest
                              </h3>
                            </div>
                            <p class="text-sm tracking-normal">
                              {course.description}
                            </p>
                            <a
                              href={`/course/${course.id}/lessonpage`}
                              class="text-center block py-2 pl-3 pr-4   rounded md:bg-gray-300 md:text-gray-700 md:p-0 md:hover:bg-gray-400 dark:text-white md:dark:text-blue-500"
                            >
                              {course.quiz != null ? (
                                <div>data</div>
                              ) : (
                                <div>access course</div>
                              )}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </body>

      <footer class="w-full text-gray-700 bg-gray-300 body-font">
        <div class="container flex flex-col flex-wrap px-1 py-2 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div class="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <p class="mt-14 text-sm text-gray-500">follow on:</p>
            <div class="mt-4">
              <span class="inline-flex justify-center  sm:ml-auto sm:mt-0 sm:justify-start">
                <a class="text-gray-900 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-3 text-gray-900 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-3 text-gray-900 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a class="ml-3 text-gray-900 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div class="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            <div class="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                CONTACT
              </h2>

              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Email
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Phone no.
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Forum
                  </a>
                </li>
              </nav>
            </div>
            <div class="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                ABOUT
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    News
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Business
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Featured
                  </a>
                </li>
              </nav>
            </div>
            <div class="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                RESOURCES
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Application
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    FAQ
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="bg-gray-900">
          <div class="container px-5 py-1 mx-auto">
            <p class="text-sm text-gray-300 capitalize xl:text-end">
              © 2023 All rights reserved{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
