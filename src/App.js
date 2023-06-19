import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import QuizTaker from "./components/QuizTaker";
import EventBus from "./common/EventBus";
import { Component } from "react";

import Navbar from "./components/Navbar";
import AddUser from "./components/user/AddUser";
import UpdateUser from "./components/user/UpdateUser";
import UserList from "./components/user/UserList";
import AddCourse from "./components/course/AddCourse";
import UpdateCourse from "./components/course/UpdateCourse";
import CourseList from "./components/course/CourseList";
import UserCoursePage from "./components/UserCoursePage";
import EmbeddedVideo from "./components/EmbeddedVideo";

import ListQuizComponent from "./components/trainer/ListQuizComponent";
import ListQuestionComponent from "./components/trainer/ListQuestionComponent";
import ListChoiceComponent from "./components/trainer/ListChoiceComponent";
import AddQuizComponent from "./components/trainer/AddQuizComponent";
import AddQuestionComponent from "./components/trainer/AddQuestionComponent";
import AddChoiceComponent from "./components/trainer/AddChoiceComponent";
import UpdateQuizComponent from "./components/trainer/UpdateQuizComponent";
import UpdateQuestionComponent from "./components/trainer/UpdateQuestionComponent";
import UpdateChoiceComponent from "./components/trainer/UpdateChoiceComponent";
import ListCourseQuizzes from "./components/trainer/ListCourseQuizzes";
import ListQuizQuestions from "./components/trainer/ListQuizQuestions";
import ListQuestionChoices from "./components/trainer/ListQuestionChoices";

//WEBSITE-2.0
import Homepage from "./components/website-2.0/Homepage";
import LoginPage from "./components/website-2.0/LoginPage";
import LessonPage from "./components/website-2.0/LessonPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <>
        <div>
          {currentUser ? (
            <nav class="relative flex items-center justify-between sm:h-10 md:justify-center py-6 px-4 mt-2 bg-emerald-500">
              <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div class="flex items-center justify-between w-full md:w-auto">
                  <a href="" aria-label="Home">
                    <img
                      src="https://www.svgrepo.com/show/491978/gas-costs.svg"
                      height="40"
                      width="40"
                    />
                  </a>
                  <a
                    href="/homepage"
                    class="inline-flex items-center ml-2 px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:border-emerald-700 transition duration-150 ease-in-out"
                  >
                    go to homepage
                  </a>
                  <div class="-mr-2 flex items-center md:hidden">
                    <button
                      type="button"
                      id="main-menu"
                      aria-label="Main menu"
                      aria-haspopup="true"
                      class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="h-6 w-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span class="inline-flex">
                  <a
                    href="/login"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium bg-white text-black hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    onClick={this.logOut}
                  >
                    Logout
                  </a>
                </span>
                <span class="inline-flex rounded-md shadow ml-2">
                  <a
                    href="/profile"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                  >
                    {currentUser.username}
                  </a>
                </span>
              </div>
            </nav>
          ) : (
            <nav class="relative flex items-center justify-between sm:h-10 md:justify-center py-6 px-4 mt-2 bg-emerald-500">
              <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div class="flex items-center justify-between w-full md:w-auto">
                  <a href="" aria-label="Home">
                    <img
                      src="https://www.svgrepo.com/show/491978/gas-costs.svg"
                      height="40"
                      width="40"
                    />
                  </a>
                  <div class="-mr-2 flex items-center md:hidden">
                    <button
                      type="button"
                      id="main-menu"
                      aria-label="Main menu"
                      aria-haspopup="true"
                      class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="h-6 w-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* <div class="hidden md:flex md:space-x-10">
                <a
                  href="#features"
                  class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Pricing
                </a>
                <a
                  href="/blog"
                  class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Blog
                </a>
                <a
                  href="https://docs.pingping.io"
                  target="_blank"
                  class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Docs
                </a>
              </div> */}
              <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span class="inline-flex">
                  <a
                    href="/login"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-black bg-white hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Login
                  </a>
                </span>
                <span class="inline-flex rounded-md shadow ml-2">
                  <a
                    href="/register"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                  >
                    Get started
                  </a>
                </span>
              </div>
            </nav>
          )}
          <Routes>
            {/*WEBSITE 2.0*/}
            <Route path="/loginpage" element={<LoginPage />}></Route>
            <Route path="/homepage" element={<Homepage />}></Route>
            <Route path="/lessonpage" element={<LessonPage />}></Route>

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route index element={<UserList />} />
            <Route path="/" element={<UserList />} />
            <Route path="/user/showAll" element={<UserList />} />
            <Route path="/course/showAll" element={<CourseList />} />
            <Route path="/signUp" element={<AddUser />} />
            <Route path="/course/add" element={<AddCourse />} />
            <Route path="/user/update/:id" element={<UpdateUser />} />
            <Route path="/course/update/:id" element={<UpdateCourse />} />
            <Route path="/user/:id/course/:id" element={<UserCoursePage />} />
            <Route path="/embedded/video" element={<EmbeddedVideo />} />
            {/* quiz forms */}
            <Route path="/quizzes" element={<ListQuizComponent />}></Route>
            <Route
              path="/course/:id/add-quiz"
              element={<AddQuizComponent />}
            ></Route>
            <Route
              path="/course/:id/quizzes"
              element={<ListCourseQuizzes />}
            ></Route>
            <Route
              path="/edit-quiz/:id"
              element={<UpdateQuizComponent />}
            ></Route>
            <Route
              path="/questions"
              element={<ListQuestionComponent />}
            ></Route>
            <Route
              path="/quiz/:id/add-question"
              element={<AddQuestionComponent />}
            ></Route>
            <Route
              path="/edit-question/:id"
              element={<UpdateQuestionComponent />}
            ></Route>
            <Route path="/choices" element={<ListChoiceComponent />}></Route>
            <Route
              path="/question/:id/add-choice"
              element={<AddChoiceComponent />}
            ></Route>
            <Route
              path="/edit-choice/:id"
              element={<UpdateChoiceComponent />}
            ></Route>
            <Route
              path="/course/:id/quizzes"
              element={<ListCourseQuizzes />}
            ></Route>
            <Route
              path="/quiz/:id/questions"
              element={<ListQuizQuestions />}
            ></Route>
            <Route
              path="/question/:id/choices"
              element={<ListQuestionChoices />}
            ></Route>
            <Route
              forceRefresh={true}
              path="/quiz/:id/take"
              element={<QuizTaker />}
            ></Route>
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
