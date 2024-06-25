import axios from 'axios';
import handleError from './handleError';
import { config } from '../configs';

export async function getData(url, params) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.get(`${config.api_host_dev}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function postData(url, payload, formData) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.post(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function putData(url, payload) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.put(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteData(url) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.delete(`${config.api_host_dev}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}
