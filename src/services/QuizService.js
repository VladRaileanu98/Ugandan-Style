import axios from "axios";

const QUIZ_BASE_REST_API_URL = "http://localhost:8080/quiz";

class QuizService {
  getAllQuizzes() {
    return axios.get(QUIZ_BASE_REST_API_URL);
  }

  getAllQuestionsByQuiz(quizId) {
    return axios.get(QUIZ_BASE_REST_API_URL, +"/questions/" + quizId);
  }

  createQuiz(quiz) {
    return axios.post(QUIZ_BASE_REST_API_URL + "/create", quiz);
  }

  getQuizById(quizId) {
    return axios.get(QUIZ_BASE_REST_API_URL, +"/" + quizId);
  }

  incrementNoQuestionsQuiz(quizId) {
    axios.put(QUIZ_BASE_REST_API_URL + "/increment/" + quizId);
  }

  addQuestion(quizId, questionId) {
    axios.put(
      QUIZ_BASE_REST_API_URL + "/questions/add/" + questionId + "/" + quizId
    );
  }

  updateQuiz(quizId, quiz) {
    return axios.put(QUIZ_BASE_REST_API_URL + "/" + quizId, quiz);
  }

  deleteQuiz(quizId) {
    return axios.delete(QUIZ_BASE_REST_API_URL + "/" + quizId);
  }
}

export default new QuizService();
