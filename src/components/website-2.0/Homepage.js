import React, { Component } from "react";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <header>
          <nav class="bg-lime-100 border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="https://flowbite.com/" class="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 mr-3"
                  alt="Flowbite Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <body class="bg-lime-200">
          <div class="flex flex-wrap justify-center mt-10 border-2">
            <div class="p-4 max-w-sm">
              <div class="flex rounded-lg h-full bg-green-400 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <img
                    src="assets/forest1.jpg"
                    alt="forest1"
                    class="w-full h-80 sm:h48 object-cover"
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <div class="m-4">
                    <span class="font-bold">Course 1</span>
                    <span class="block text-gray-500 text-sm">
                      Recipe by Mario
                    </span>
                  </div>
                  <div class="badge">
                    <span>25 mins</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 max-w-sm">
              <div class="flex rounded-lg h-full bg-green-400 p-8 flex-col border-2">
                <div class="flex items-center mb-3">
                  <img
                    src="assets/forest2.jpg"
                    alt="forest1"
                    class="w-full h-80 sm:h48 object-cover"
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <div class="m-4">
                    <span class="font-bold">Course 2</span>
                    <span class="block text-gray-500 text-sm">
                      Recipe by Mario
                    </span>
                  </div>
                  <div class="badge">
                    <span>25 mins</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 max-w-sm">
              <div class="flex rounded-lg h-full bg-green-400 p-8 flex-col border-2">
                <div class="flex items-center mb-0">
                  <img
                    src="assets/forest3.jpg"
                    alt="forest1"
                    class="w-full h-80 sm:h48 object-cover"
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <div class="m-4">
                    <span class="font-bold">Course 3</span>
                    <span class="block text-gray-500 text-sm">
                      Recipe by Mario
                    </span>
                  </div>
                  <div class="badge">
                    <span>25 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>

        <footer class="bg-lime-300">
          <div class="container mx-auto px-4">@copyright</div>
        </footer>
      </div>
    );
  }
}
