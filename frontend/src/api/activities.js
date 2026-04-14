import axios from "axios";

const API_URL = "http://localhost:8080/api/activities";

export const getActivities = (page = 0, size = 5, name = "") => {
  return axios.get(API_URL, {
    params: { page, size, name }
  });
};