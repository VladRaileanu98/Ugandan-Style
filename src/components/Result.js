import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

const Result = ({ showResult, quizs, marks, quizScore, startOver }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  function createGrade() {
    axios
      .post(
        "http://localhost:8080/grade/add/" +
          id +
          "/" +
          window.localStorage.getItem("user_id") +
          "/" +
          marks
      )
      .then((response) => {
        console.log(response.data);
        navigate("/homepage");
      });
  }

  return (
    <section
      className="bg-gradient-to-r from-gray-500  to-gray-900 text-white"
      style={{ display: `${showResult ? "block" : "none"}` }}
    >
      {" "}
      {console.log("THIS IS THE RESULT " + marks)}
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div
              className={`text-dark text-center p-5 rounded ${
                marks > (quizs.length * 1) / 2
                  ? "bg-gradient-to-r from-gray-100  to-gray-200"
                  : "bg-danger"
              }`}
            >
              <h1 className="mb-2 fw-bold">
                {marks > (quizs.length * 1) / 2
                  ? "Congratulations!"
                  : "Try again!"}
              </h1>
              <h3 className="mb-3 fw-bold">
                Your score is {marks} out of {quizScore}
              </h3>

              <button
                onClick={startOver}
                className="btn py-2 px-4 btn-dark fw-bold d-inline"
              >
                Start Over
              </button>
              <button
                onClick={createGrade}
                className="btn py-2 ml-2 px-4 btn-dark fw-bold d-inline"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
