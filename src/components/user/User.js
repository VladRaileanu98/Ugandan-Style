import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const User = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const editUser = (e, id) => {
    e.preventDefault();
    navigate(`/user/update/${id}`);
  };

  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUserCourses(1);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const options = [
    { id: user.email, name: 1 },
    { id: "Rockvaiv", name: 2 },
    { id: "Blue", name: 3 },
    { id: "Yellow", name: 4 },
  ];

  return (
    <tr key={user.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.username}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Select
          name="select"
          options={options}
          labelField="id"
          valueField="name"
        ></Select>
        <select value={courses} onChange={(e) => setCourses(e.target.value)}>
          {courses?.map((course) => {
            return (
              <option key={course.id}>
                <p>{course.name}</p>
              </option>
            );
          })}
        </select>
        <div>
          laberinto
          {courses?.map((course) => {
            return (
              <div key={course.id}>
                <p>{course.name}</p>
              </div>
            );
          })}
        </div>
      </td>
      <td className="text-right px-1 py-4 whitespace-nowrap font-medium text-sm">
        <a
          onClick={(e, id) => editUser(e, user.id)}
          className="text-white hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-600"
        >
          edit
        </a>
        <a
          onClick={(e, id) => deleteUser(e, user.id)}
          className="text-red-200 hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-400"
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default User;
