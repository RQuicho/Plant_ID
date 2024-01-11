import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PlantIdApi {
  static token;
  // Plant routes
  static async getPlant(scientificName) {
    try {
      const result = await axios.get(`${BASE_API_URL}/plants/${scientificName}`);
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
  static async deletePlantFromList(scientificName, listName) {
    try {
      const result = await axios.delete(`${BASE_API_URL}/plants/${scientificName}/${listName}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  // List routes
  static async getList(name) {
    try {
      const result = await axios.get(`${BASE_API_URL}/lists/${name}`);
      return result.data.list;
    } catch (err) {
      console.log(err);
    }
  }
  static async addPlantToList(listName, plantName) {
    try {
      const result = await axios.post(`${BASE_API_URL}/lists/${listName}/plants/${plantName}`);
      return result.data;
    } catch (err) {
      console.log('Error in front end for PlantIdApi addPlantToList: ', err);
    }
  }
  static async getPlantByListName(listName) {
    try {
      const result = await axios.get(`${BASE_API_URL}/lists/${listName}/plants`);
      return result.data;
    } catch (err) {
      console.log('Error in front end of PlantIdApi getPlantByListName: ', err);
    }
  }
  static async postList(data) {
    try {
      const result = await axios.post(`${BASE_API_URL}/lists`, data);
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
  static async deleteListByUser(listName, username) {
    try {
      const result = await axios.delete(`${BASE_API_URL}/lists/${listName}/${username}`);
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
      return result.data.token;
    } catch (err) {
      console.log(err);
    }
  }
  static async updateUserProfile(username, data) {
    try {
      const result = await axios.patch(`${BASE_API_URL}/users/${username}`, data);
      return result.data.user;
    } catch (err) {
      console.log(err);
    }
  }
  static async addListToUser(username, listName) {
    try {
      const result = await axios.post(`${BASE_API_URL}/users/${username}/lists/${listName}`);
      return result.data;
    } catch (err) {
      console.log('Error in front end for PlantIdApi addListToUser: ', err);
    }
  }
  static async getListsByUser(username) {
    try {
      const result = await axios.get(`${BASE_API_URL}/users/${username}/lists`);
      return result.data;
    } catch (err) {
      console.log('Error in front end of PlantIdApi getListsByUser: ', err);
    }
  }
}

export default PlantIdApi;