import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const AddUser = () => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    UserService.saveUser(user)
      .then((response) => {
        console.log(response);
        navigate("/showAll");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setUser({
      id: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>add new user</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            user name
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            email
          </label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            password
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveUser}
            className="rounded text-white font-semibold bg-green-400 py-2 px-6 hover:bg-green-700"
          >
            save
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-red-400 py-2 px-6 hover:bg-red-700"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
