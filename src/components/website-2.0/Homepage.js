import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseService from "../../services/CourseService";
import AuthService from "../../services/auth.service";
import axios from "axios";
import UserService from "../../services/UserService";
function Homepage() {
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    //getAllCourses();
    getUserCourses();
    setUserName(window.localStorage.getItem("user_name"));
  }, []);

  const getAllCourses = () => {
    CourseService.getCourses()
      .then((response) => {
        setCourses(response.data);
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
      <header>
        <nav class="bg-gray-300 border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
            <a href="https://oracle.com/" class="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8 mr-3"
                alt="Flowbite Logo"
              /> */}
              <span class="text-gray-900 pl-11 ml-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Oracle
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              class="inline-flex items-center p-1 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              class="mr-20 hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/user/showAll"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-lime-300 hover:bg-gray-100 md:hover:bg-lime-400 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    users
                  </a>
                </li>
                <li>
                  <a
                    href="/course/showAll"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-red-400 hover:bg-gray-100 md:hover:bg-red-500 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
          <div class="container p-4 bg-gray-100 rounded-xl">
            <h1 class="text-4xl uppercase font-bold from-current mb-8">
              {userName}'s courses
            </h1>

            <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
              {courses.map((course) => (
                <div class="bg-white">
                  <div>
                    <div class="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                      <div>
                        <img class="w-full" src={course.embedLink} />
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
        </div>
      </body>

      <footer class="w-full text-gray-700 bg-gray-100 body-font">
        <div class="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div class="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <a class="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
              <svg
                class="w-auto h-5 text-gray-100 fill-current"
                viewBox="0 0 202 69"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M57.44.672s6.656 1.872 6.656 5.72c0 0-1.56 2.6-3.744 6.552 8.424 1.248 16.744 1.248 23.816-1.976-1.352 7.904-12.688 8.008-26.208 6.136-7.696 13.624-19.656 36.192-19.656 42.848 0 .416.208.624.52.624 4.576 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392C56.608 53.088 42.152 69 36.432 69c-4.472 0-8.216-5.928-8.216-10.4 0-6.552 11.752-28.08 20.28-42.952-9.984-1.664-20.176-3.64-27.976-3.848-13.936 0-16.64 3.536-17.576 6.032-.104.312-.52.52-.832.312-3.744-7.072-1.456-14.56 14.144-14.56 9.36 0 22.048 4.576 34.944 7.592C54.736 5.04 57.44.672 57.44.672zm46.124 41.08c1.144-1.456 4.264.728 3.016 2.392C100.236 53.088 85.78 69 80.06 69c-4.576 0-8.32-5.928-8.32-10.4v-.208C67.58 64.32 63.524 69 61.34 69c-4.472 0-8.944-4.992-8.944-11.856 0-10.608 15.704-33.072 24.96-33.072 4.992 0 7.384 2.392 8.528 4.576l2.6-4.576s6.656 1.976 6.656 5.824c0 0-13.312 24.336-13.312 30.056 0 .208 0 .624.52.624 4.472 0 17.888-14.352 21.216-18.824zm-40.56 18.72c2.184 0 11.752-13.312 17.368-22.048l4.16-7.488c-8.008-7.904-27.248 29.536-21.528 29.536zm57.564-38.168c-2.184 0-4.992-2.808-4.992-4.784 0-2.912 5.824-14.872 7.28-14.872 2.6 0 6.136 2.808 6.136 6.344 0 2.08-7.176 12.064-8.424 13.312zm-17.68 46.592c-4.472 0-8.216-5.928-8.216-10.4 0-6.656 16.744-34.528 16.744-34.528s6.552 1.976 6.552 5.824c0 0-13.312 24.336-13.312 30.056 0 .208.104.624.624.624 4.472 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392-6.448 8.944-20.904 24.856-26.624 24.856zM147.244.672s6.656 1.872 6.656 5.72c0 0-25.792 43.784-25.792 53.56 0 .416.208.624.52.624 4.576 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392C146.412 53.088 131.956 69 126.236 69c-4.472 0-8.216-5.928-8.216-10.4 0-10.4 29.224-57.928 29.224-57.928zM169.7 60.16c3.848-2.392 7.904-6.864 10.816-10.92 6.656-9.464 11.544-20.696 10.504-27.352-.312-3.432-.104-4.056 3.12-2.704 5.2 2.392 11.336 8.632 2.184 22.88-5.2 8.008-12.48 15.288-19.344 19.76-2.704 1.768-6.344 3.328-9.984 4.16-.52.416-1.04.728-1.456.936-1.872 1.352-4.264 2.08-7.592 2.08-14.664 0-16.848-12.272-16.848-16.016 0-2.392 3.224-4.68 4.784-3.744.208.104.312.416.312.624 0 2.808 1.872 13.104 9.984 13.104 7.904 0 3.432-18.304 2.288-27.144-1.456 2.288-3.432 4.992-5.616 8.32-2.6 3.744-5.72 1.456-4.784 0 5.824-8.424 9.152-13.832 11.856-18.616 1.248-2.08 3.328-3.328 6.448-3.328 2.704 0 5.824 3.016 6.864 4.784.312.52 0 1.04-.52 1.144a5.44 5.44 0 00-4.368 5.408c0 6.968 2.6 17.16 1.664 24.856l-.312 1.768z"
                  fill-rule="nonzero"
                />
              </svg>
            </a>
            <p class="mt-2 text-sm text-gray-500">tailwind css</p>
            <div class="mt-4">
              <span class="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
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
                section 1
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
              </nav>
            </div>
            <div class="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                section 2
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
              </nav>
            </div>
            <div class="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                section 3
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
                <li class="mt-3">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-900">
                    ~
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="bg-gray-300">
          <div class="container px-5 py-4 mx-auto">
            <p class="text-sm text-gray-700 capitalize xl:text-center">
              © 2023 All rights reserved{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
