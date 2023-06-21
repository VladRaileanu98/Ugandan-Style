import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import CourseService from "../../services/CourseService";

function ListQuizComponent() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);

  const [quizzes, setQuizzes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuizzesByCourseId(id);
  }, [id]);

  const getAllQuizzesByCourseId = () => {
    axios
      .get("http://localhost:8080/course/quizzes/" + id) //pt ca cu QuizService.getAllQuestionsByQuiz(id) nu mergea
      .then((response) => {
        setQuizzes(response.data);
        console.log("response: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (cookies.role !== "student") {
    return (
      <body className="min-h-screen bg-gradient-to-r from-gray-500  to-gray-900">
        <div className="container">
          <h2 className="text-center text-white py-3">
            {" "}
            Course No. {id} Quizzes{" "}
          </h2>
          <button
            onClick={() => navigate(`/course/${id}/add-quiz`)}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            add quiz
          </button>

          <button
            onClick={() => navigate(`/course/showAll`)}
            className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
          >
            back to course
          </button>
          <table className="table table-bordered bg-white table-striped">
            <thead style={{ textAlign: "center" }}>
              <th> id </th>
              <th> noOfQuestions</th>
              <th> timeLimit </th>
              <th> deadline</th>
              <th> isVisible </th>
              <th> actions </th>
            </thead>
            {quizzes?.length ? (
              <tbody>
                {quizzes.map((quiz) => (
                  <tr style={{ textAlign: "center" }} key={quiz.id}>
                    <td> {quiz.id} </td>
                    <td> {quiz.noOfQuestions} </td>
                    <td> {quiz.timeLimit} </td>
                    <td> {quiz.deadline} </td>
                    <td> {JSON.stringify(quiz.isVisible)} </td>
                    <td>
                      {/* <Link
                to={`/wantedInformation/${quiz.id}`}
                className="btn btn-success"
              >
                go to information
              </Link> */}
                      <Link
                        to={`/quiz/${quiz.id}/questions`}
                        className="btn btn-success"
                      >
                        list questions
                      </Link>
                      <Link
                        to={`/edit-quiz/${quiz.id}`}
                        className="btn btn-warning"
                      >
                        edit
                      </Link>
                      <Link
                        to={`/quiz/${quiz.id}/take`}
                        className="btn btn-alert"
                      >
                        test quiz
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p>no quizzes to display</p>
            )}
          </table>
        </div>
      </body>
    );
  }
}

export default ListQuizComponent;
