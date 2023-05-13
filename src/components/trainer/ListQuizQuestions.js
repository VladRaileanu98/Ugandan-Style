import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import QuizService from "../../services/QuizService";

function ListQuestionComponent() {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const [courseId, setCourseId] = useState();

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
    <div className="container">
      <h2 className="text-center"> Quiz No. {id} Questions </h2>
      <Link to={`/quiz/${id}/add-question`} className="btn btn-primary">
        Add Question to quiz no.{id}
      </Link>
      <Link to={`/course/${courseId}/quizzes`} className="btn btn-danger">
        go back to quiz no.{id}
      </Link>
      <table className="table table-bordered table-striped">
        <thead style={{ textAlign: "center" }}>
          <th> question id </th>
          <th> question name</th>
          <th> question score </th>
          <th> no. of choices </th>
          <th> action: </th>
        </thead>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListQuestionComponent;
