import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QuizService from "../../services/QuizService";

function ListQuestionComponent() {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const [courseId, setCourseId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuestionsByQuiz(id);
    getQuizCourseId(id);
    console.log(`this is the quiz id: ${id}`);
  }, [id]);

  const getAllQuestionsByQuiz = () => {
    axios
      .get("http://localhost:8080/quiz/questions/" + id)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
        console.log("id=", id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQuizCourseId = () => {
    QuizService.getCourseId(id)
      .then((response) => {
        setCourseId(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <body className="min-h-screen bg-gradient-to-r from-gray-500  to-gray-900">
      <div className="container">
        <h2 className="text-center text-white py-3">
          {" "}
          Quiz No. {id} Questions{" "}
        </h2>
        <button
          onClick={() => navigate(`/quiz/${id}/add-question`)}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          add question
        </button>

        <button
          onClick={() => navigate(`/course/${courseId}/quizzes`)}
          className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
        >
          back to quiz
        </button>
        <table className="table bg-white table-bordered table-striped">
          <thead style={{ textAlign: "center" }}>
            <th> question id </th>
            <th> question name</th>
            <th> question score </th>
            <th> no. of choices </th>
            <th> action: </th>
          </thead>
          {questions?.length ? (
            <tbody>
              {questions.map((questionE) => (
                <tr style={{ textAlign: "center" }} key={questionE.id}>
                  <td> {questionE.id} </td>
                  <td> {questionE.question} </td>
                  <td> {questionE.score} </td>
                  <td> {questionE.noOfChoices} </td>
                  <td>
                    <Link
                      to={`/question/${questionE.id}/choices`}
                      className="btn btn-success"
                    >
                      List Question Choices
                    </Link>
                    <Link
                      to={`/edit-question/${questionE.id}`}
                      className="btn btn-warning"
                    >
                      edit Question
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>no questions to display</p>
          )}
        </table>
      </div>
    </body>
  );
}

export default ListQuestionComponent;
