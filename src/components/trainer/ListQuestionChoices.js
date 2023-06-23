import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QuestionService from "../../services/QuestionService";

const ListChoiceComponent = () => {
  const [choices, setChoices] = useState([]);
  const [quizId, setQuizId] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getAllChoicesByQuestion(id);
    getQuestionQuizId(id);
    console.log(`this is the question id: ${id}`);
  }, []);

  const getAllChoicesByQuestion = () => {
    axios
      .get("http://localhost:8080/question/choices/" + id)
      .then((response) => {
        setChoices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQuestionQuizId = () => {
    QuestionService.getQuizId(id)
      .then((response) => {
        setQuizId(response.data);
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
          List Question no.{id} Choices{" "}
        </h2>
        <button
          onClick={() => navigate(`/question/${id}/add-choice`)}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          add choice
        </button>

        <button
          onClick={() => navigate(`/quiz/${quizId}/questions`)}
          className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
        >
          back to question
        </button>
        <table className="table bg-white table-bordered table-striped">
          <thead style={{ textAlign: "center" }}>
            <th> Choice Id </th>
            <th> Choice answer</th>
            <th> Choice isCorrect </th>
            {/* <th> Action </th> */}
          </thead>
          {choices?.length ? (
            <tbody>
              {choices.map((choice) => (
                <tr style={{ textAlign: "center" }} key={choice.id}>
                  <td> {choice.id} </td>
                  <td> {choice.answer} </td>
                  <td> {JSON.stringify(choice.isCorrect)}</td>
                  <td>
                    <Link
                      to={`/edit-choice/${choice.id}`}
                      className="btn btn-warning"
                    >
                      Edit choice
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>no choices to display</p>
          )}
        </table>
      </div>
    </body>
  );
};

export default ListChoiceComponent;
