import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import QuestionService from "../../services/QuestionService";

const ListChoiceComponent = () => {
  const [choices, setChoices] = useState([]);
  const [quizId, setQuizId] = useState();
  const { id } = useParams();

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
    <div className="container">
      <h2 className="text-center"> List Question no.{id} Choices </h2>
      <Link to={`/question/${id}/add-choice`} className="btn btn-primary">
        {" "}
        Add Choice to question no.{id}
      </Link>
      <Link to={`/quiz/${quizId}/questions`} className="btn btn-danger">
        {" "}
        go back to question no.{id}
      </Link>
      <table className="table table-bordered table-striped">
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
                    className="btn btn-alert"
                  >
                    Edit choice {choice.id}
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
  );
};

export default ListChoiceComponent;
