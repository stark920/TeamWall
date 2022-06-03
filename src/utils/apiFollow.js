import axios from 'axios';
import { API_URL } from '../global/constant';

const followsRequest = axios.create({
  baseURL: `${API_URL}/users/follows`,
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

export const apiFollow = {
  getAll: () => followsRequest.get('', token()),
};
