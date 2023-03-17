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
