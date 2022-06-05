import axios from 'axios';
import { API_URL } from '../global/constant';

const commentRequest = axios.create({
  baseURL: `${API_URL}/comment`,
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

// commentRequest.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

commentRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const data = error.response.data;
    return Promise.reject(data);
  }
);

export const apiComment = {
  get: (postID) => commentRequest.get(`/${postID}`, token()),
  send: (postID, data) => commentRequest.post(`/${postID}`, data, token()),
};
