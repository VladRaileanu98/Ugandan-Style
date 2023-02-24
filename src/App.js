import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
import UpdateUser from "./components/UpdateUser";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<UserList />} />
          <Route path="/" element={<UserList />} />
          <Route path="/showAll" element={<UserList />} />
          <Route path="/signUp" element={<AddUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
