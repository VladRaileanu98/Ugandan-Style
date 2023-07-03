import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ListGradesComponent() {
  const [grades, setGrades] = useState([]);
  const { id } = useParams();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllGradesByUser(id);
    //getGradeUserId(id);
    console.log(`this is the user id: ${id}`);
  }, [id]);

  const getAllGradesByUser = () => {
    axios
      .get("http://localhost:8080/grade/allGrades/" + id)
      .then((response) => {
        setGrades(response.data);
        console.log(response.data);
        console.log("id=", id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const getGradeUserId = () => {
  //     axios
  //       .get("http://localhost:8080/grade/allGrades/" + id)
  //       .then((response) => {
  //         setGrade(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <body className="min-h-screen bg-gradient-to-r from-gray-500  to-gray-900">
      <div className="container">
        <h2 className="text-center text-white py-3">
          {" "}
          Quiz No. {id} Questions{" "}
        </h2>
        <button
          onClick={() => navigate(`/user/showAll`)}
          className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
        >
          back to users
        </button>
        <table className="table bg-white table-bordered table-striped">
          <thead style={{ textAlign: "center" }}>
            <th> grade </th>
            <th> quiz </th>
            {/* <th> lesson </th> */}
          </thead>
          {grades?.length ? (
            <tbody>
              {grades.map((grade) => (
                <tr style={{ textAlign: "center" }} key={grade.id}>
                  <td> {grade.grade} </td>
                  <td> {grade.quiz.id} </td>
                  {/* <td> {grade.quiz.lessonId} </td> */}
                </tr>
              ))}
            </tbody>
          ) : (
            <p>no grades to display</p>
          )}
        </table>
      </div>
    </body>
  );
}

export default ListGradesComponent;
