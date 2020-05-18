import axios from 'axios';

const API_BASE_URL = 'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev';
axios.defaults.baseURL = API_BASE_URL;

export default {
  getData() {
    return axios.get('/posts');
  },
  createData(data) {
    return axios.post('/post', data);
  },
  updateData(data) {
    return axios.put(`/post/${data.id}`, data);
  },
  deleteData(id) {
    return axios.delete(`/post/${id}`);
  },
};
