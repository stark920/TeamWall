41 lines (36 sloc)  834 Bytes
   
import axios from 'axios';
import { API_URL } from '../global/constant';

const chatRequest = axios.create({
  baseURL: `${API_URL}/chat`,
  timeout: 20000,
});

export const token = () => {
  if (!localStorage.getItem('metaWall')) {
    return false;
  }
  return {
    headers: {
      Authorization: localStorage.getItem('metaWall'),
    },
  };
};

// chatRequest.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// chatRequest.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export const apiChat = {
  record: () => chatRequest.post('/chat-record'),
  room: (data) => chatRequest.post('/room-info', data),
};