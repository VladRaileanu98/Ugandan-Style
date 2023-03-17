import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import User from "./User";

const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteUser = (e, id) => {
    e.preventDefault();
    UserService.deleteUser(id).then((res) => {
      if (users) {
        setUsers((prevElement) => {
          return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/signUp")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          add user
        </button>
        <button
          onClick={() => navigate("/signUpPage")}
          className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
        >
          go to login page
        </button>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-lime-300">
            <tr>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                first name
              </th>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                last name
              </th>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                email id
              </th>
              <th className="text-right font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-lime-100">
              {users.map((user) => (
                <User user={user} deleteUser={deleteUser} key={user.id}></User>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserList;
