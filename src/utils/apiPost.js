
import axios from 'axios';
import { API_URL } from '../global/constant';

const postsRequest = axios.create({
  baseURL: `${API_URL}/posts`,
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

// postsRequest.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// postsRequest.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export const apiPost = {
  getAll: (filter = '') => postsRequest.get(`/?${filter}`, token()),
  getOne: (id) => postsRequest.get(`/${id}`, token()),
  upload: (data) => postsRequest.post('', data, token()),
  comment: (id, data) => postsRequest.post(`/${id}`, data, token()),
  getAllLikes: () => postsRequest.post('/likes', token()),
  like: (id) => postsRequest.get(`/like/${id}`, token()),
  update: (id, data) => postsRequest.patch(`/${id}`, data, token()),
};