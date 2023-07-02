import axios from "axios";

const MESSAGE_API_BASE_URL = "http://localhost:8080/message";

class MessageService {
  getAllMessages() {
    return axios.get(MESSAGE_API_BASE_URL + "/showAll");
  }

  getMessageById(id) {
    return axios.get(MESSAGE_API_BASE_URL + "/showById/" + id);
  }

  getSenderId(id) {
    return axios.get(MESSAGE_API_BASE_URL + "/" + id + "/sender");
  }
  getReceiverId(id) {
    return axios.get(MESSAGE_API_BASE_URL + "/" + id + "/receiver");
  }

  createMessage(message) {
    return axios.post(MESSAGE_API_BASE_URL + "/create", message);
  }

  deleteMessage(id) {
    return axios.delete(MESSAGE_API_BASE_URL + "/delete/" + id);
  }
}
export default new MessageService();
