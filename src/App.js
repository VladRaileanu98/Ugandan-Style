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
import Modulepage from "./components/website-2.0/Modulepage";

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
          <nav class="flex items-center justify-between flex-wrap bg-slate-800 p-6">
            {currentUser ? (
              <div class="flex items-center flex-shrink-0 text-white mr-6">
                <li>
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li>
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <Routes>
            {/*WEBSITE 2.0*/}
            <Route path="/loginpage" element={<LoginPage />}></Route>
            <Route path="/homepage" element={<Homepage />}></Route>
            <Route path="/modulepage" element={<Modulepage />}></Route>

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
