import React from "react";

const Start = ({ startQuiz, showStart }) => {
  return (
    <section
      className="text-black text-center bg-gradient-to-r from-gray-500  to-gray-900"
      style={{ display: `${showStart ? "block" : "none"}` }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4"
              style={{ background: "#E8E8E8", borderColor: "#646464" }}
            >
              <h1 className="fw-bold mb-4">Javascript Basics Quiz</h1>
              <button
                onClick={startQuiz}
                className="btn px-4 py-2 bg-dark text-light fw-bold"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
