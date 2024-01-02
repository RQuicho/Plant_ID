import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PlantIdApi {
  static token;
  // Plant routes
  static async getPlant(scientificName) {
    try {
      const result = await axios.get(`${BASE_API_URL}/plants/details/${scientificName}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
  static async postPlantPhoto() {
    try {
      const result = await axios.post(`${BASE_API_URL}/plants/upload`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
  // List routes
  static async getList(name) {
    try {
      const result = await axios.get(`${BASE_API_URL}/lists/${name}`);
      return result.list;
    } catch (err) {
      console.log(err);
    }
  }
  static async postList(data) {
    try {
      const result = await axios.post(`${BASE_API_URL}/lists`, data);
      return result.list;
    } catch (err) {
      console.log(err);
    }
  }
  static async patchList(name, data) {
    try {
      const result = await axios.patch(`${BASE_API_URL}/lists/${name}`, data);
      return result.list;
    } catch (err) {
      console.log(err);
    }
  }
  // User routes
  static async getUser(username) {
    try {
      const result = await axios.get(`${BASE_API_URL}/users/${username}`);
      return result.data.user;
    } catch (err) {
      console.log(err);
    }
  }
  static async login(data) {
    try {
      const result = await axios.post(`${BASE_API_URL}/auth/token`, data);
      return result.data.token;
    } catch (err) {
      console.log(err);
    }
  }
  static async signup(data) {
    try {
      const result = await axios.post(`${BASE_API_URL}/auth/register`, data);
      console.log('result in front end signup PlantIdApi: ', result);
      return result.data.token;
    } catch (err) {
      console.log(err);
    }
  }
  static async updateUserProfile(username, data) {
    try {
      const result = await axios.patch(`${BASE_API_URL}/users/${username}`, data);
      return result.user;
    } catch (err) {
      console.log(err);
    }
  }
}

export default PlantIdApi;