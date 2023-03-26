import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
// import SignUp from "./components/SignUp";
import UpdateUser from "./components/UpdateUser";
import UserList from "./components/UserList";
// import SignIn from "./components/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<UserList />} />
          <Route path="/" element={<UserList />} />
          {/* <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} /> */}
          <Route path="/showAll" element={<UserList />} />
          <Route path="/signUp" element={<AddUser />} />
          {/* <Route path="/signUpPage" element={<SignUp />} /> */}
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import "./App.css";
// import AddUser from "./components/AddUser";
// import Navbar from "./components/Navbar";
// // import SignUp from "./components/SignUp";
// import UpdateUser from "./components/UpdateUser";
// import UserList from "./components/UserList";
// // import SignIn from "./components/SignIn";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import AuthService from "./services/auth.service";

// import Login from "./components/login.component";
// import Register from "./components/register.component";
// import Home from "./components/home.component";
// import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

// // import AuthVerify from "./common/auth-verify";
// import EventBus from "./common/EventBus";
// import { Component } from "react";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined,
//     };
//   }

//   componentDidMount() {
//     const user = AuthService.getCurrentUser();

//     if (user) {
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//       });
//     }

//     EventBus.on("logout", () => {
//       this.logOut();
//     });
//   }

//   componentWillUnmount() {
//     EventBus.remove("logout");
//   }

//   logOut() {
//     AuthService.logout();
//     this.setState({
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined,
//     });
//   }

//   render() {
//     const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

//     return (
//       <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           {currentUser ? (
//             <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/profile"} className="nav-link">
//                   {currentUser.username}
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <a href="/login" className="nav-link" onClick={this.logOut}>
//                   LogOut
//                 </a>
//               </li>
//             </div>
//           ) : (
//             <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/login"} className="nav-link">
//                   Login
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link to={"/register"} className="nav-link">
//                   Sign Up
//                 </Link>
//               </li>
//             </div>
//           )}
//         </nav>

//         <div className="container mt-3">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/user" element={<BoardUser />} />
//             <Route path="/mod" element={<BoardModerator />} />
//             <Route path="/admin" element={<BoardAdmin />} />
//           </Routes>
//           <Navbar />
//           <Routes>
//             <Route path="/showAll" element={<UserList />} />
//             <Route path="/signUp" element={<AddUser />} />
//             <Route path="/update/:id" element={<UpdateUser />} />
//           </Routes>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
