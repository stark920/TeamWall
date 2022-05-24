import axios from 'axios';
import { API_URL } from '../global/constant';

const likesRequest = axios.create({
  baseURL: `${API_URL}/likes`,
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

// likesRequest.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// likesRequest.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export const apiLike = {
  getAll: () => likesRequest.post('', token()),
  toggle: (data) => likesRequest.get('/likePost', data, token()),
};
