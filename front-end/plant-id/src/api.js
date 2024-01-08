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
  // COMMENTED OUT BECAUSE THIS WILL DELETE PLANT FROM PLANTS DATABASE
  // static async deletePlant(scientificName) {
  //   try {
  //     const result = await axios.delete(`${BASE_API_URL}/plants/${scientificName}`);
  //     return result;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  static async deletePlantFromList(scientificName) {
    try {
      const result = await axios.delete(`${BASE_API_URL}/plants/${scientificName}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  // List routes
  static async getList(name) {
    try {
      const result = await axios.get(`${BASE_API_URL}/lists/${name}`);
      console.log('result in front end from PlantIdApi getList: ', result);
      return result.data.list;
    } catch (err) {
      console.log(err);
    }
  }
  static async addPlantToList(listName, plantName) {
    try {
      const result = await axios.post(`${BASE_API_URL}/lists/${listName}/plants/${plantName}`); // change listplant db from plant_id to scientific_name
      console.log('result in front end for PlantIdApi addPlantToList: ', result);
      return result.data;
    } catch (err) {
      console.log('Error in front end for PlantIdApi addPlantToList: ', err);
    }
  }
  static async getPlantByListName(listName) {
    try {
      const result = await axios.get(`${BASE_API_URL}/lists/${listName}/plants`);
      console.log('result in front end for PlantIdApi getPlantByListName: ', result);
      return result.data;
    } catch (err) {
      console.log('Error in front end of PlantIdApi getPlantByListName: ', err);
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
  static async deleteList(name) {
    try {
      const result = await axios.delete(`${BASE_API_URL}/lists/${name}`);
      return result;
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
  static async addListToUser(username, listName) {
    try {
      const result = await axios.post(`${BASE_API_URL}/users/${username}/lists/${listName}`);
      console.log('result in front end for PlantIdApi addListToUser: ', result);
      return result.data;
    } catch (err) {
      console.log('Error in front end for PlantIdApi addListToUser: ', err);
    }
  }
  static async getListsByUser(username) {
    try {
      const result = await axios.get(`${BASE_API_URL}/users/${username}/lists`);
      console.log('result in front end for PlantIdApi getListsByUser: ', result);
      return result.data;
    } catch (err) {
      console.log('Error in front end of PlantIdApi getListsByUser: ', err);
    }
  }
}

export default PlantIdApi;