import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PlantIdApi {
  static token;
  // Plant routes
  static async getPlant(scientificName) {
    try {
      const result = await axios.get(`${BASE_API_URL}/plants/${scientificName}`);
      console.log('result in front end from PlantIdApi getPlant: ', result);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
  static async postPlantPhoto(file) {
    try {
      const formData = new FormData();
      formData.append('plantImg', file);

      const result = await axios.post(`${BASE_API_URL}/plants/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('result in front end for PlantIdApi postPlantPhoto: ', result);
      return result.data;
    } catch (err) {
      console.log('Error for front end api postPlantPhoto: ', err);
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
      console.log('data in front end from api postList: ', data);
      const result = await axios.post(`${BASE_API_URL}/lists`, data);
      console.log('result in front end from api postList: ', result);
      return result.data;
    } catch (err) {
      console.log('Error in front end from api postList: ', err);
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
      // console.log('result in front end signup PlantIdApi: ', result);
      return result.data.token;
    } catch (err) {
      console.log(err);
    }
  }
  static async updateUserProfile(username, data) {
    try {
      const result = await axios.patch(`${BASE_API_URL}/users/${username}`, data);
      console.log('result in front end for PlantIdApi: ', result);
      return result.data.user;
    } catch (err) {
      console.log(err);
    }
  }
}

export default PlantIdApi;