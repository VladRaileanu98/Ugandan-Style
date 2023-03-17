import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const editUser = (e, id) => {
    e.preventDefault();
    navigate(`/update/${id}`);
  };

  return (
    <tr key={user.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
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
