import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const createUser = (user) => {
  return axios.post(API_URL, user);
};

export const createActivity = (userId, activity) => {
  return axios.post(`${API_URL}/${userId}/activities`, activity);
};

export const getUserActivities = (userId) => {
  return axios.get(`${API_URL}/${userId}/activities`);
};