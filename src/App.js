// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import AddUser from "./components/user/AddUser";
// import UpdateUser from "./components/user/UpdateUser";
// import UserList from "./components/user/UserList";
// import AddCourse from "./components/course/AddCourse";
// import UpdateCourse from "./components/course/UpdateCourse";
// import CourseList from "./components/course/CourseList";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";

// import UserCoursePage from "./components/UserCoursePage";
// import EmbeddedVideo from "./components/EmbeddedVideo";
// // import SignIn from "./components/SignIn";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route index element={<UserList />} />
//           <Route path="/" element={<UserList />} />
//           <Route path="/user/showAll" element={<UserList />} />
//           <Route path="/course/showAll" element={<CourseList />} />
//           <Route path="/signUp" element={<AddUser />} />
//           <Route path="/course/add" element={<AddCourse />} />
//           <Route path="/user/update/:id" element={<UpdateUser />} />
//           <Route path="/course/update/:id" element={<UpdateCourse />} />
//           <Route path="/user/:id/course/:id" element={<UserCoursePage />} />
//           <Route path="/embedded/video" element={<EmbeddedVideo />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

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
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
