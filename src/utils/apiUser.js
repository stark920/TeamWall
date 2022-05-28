import axios from 'axios';
import { API_URL } from '../global/constant';

const usersRequest = axios.create({
  baseURL: `${API_URL}/users`,
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

// usersRequest.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

usersRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const data = error.response.data;
    return Promise.reject(data);
  }
);

export const apiUser = {
  signIn: (data) => usersRequest.post('/sign-in', data),
  signUp: (data) => usersRequest.post('/sign-up', data),
  signOut: () => usersRequest.delete('/sign-out', token()),
  check: () => usersRequest.get('/check', token()),
  updateProfile: (data) => usersRequest.patch('/profile', data, token()),
  updatePassword: (data) => usersRequest.patch('/profile/pwd', data, token()),
  getProfile: (id) => usersRequest.get(`/${id}`, token()),
  follow: (id, data) => usersRequest.post(`/${id}/follow`, data, token()),
  deleteFollow: (id) => usersRequest.delete(`/${id}/follow`, token()),
};
