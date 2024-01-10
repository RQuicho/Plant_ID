import React, { useState, useContext } from 'react';
import PlantIdApi from '../api';
import { Navigate } from 'react-router-dom';
import UserContext from "../UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forms.css";

const ListForm = () => {
  const {currentUser} = useContext(UserContext);
  const initialState = {
    name: '',
    description: ''
  }
  const [formData, setFormData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
   
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newList = await PlantIdApi.postList(formData);
      if (newList && newList.list) {
        await PlantIdApi.addListToUser(currentUser.username, newList.list.name);
        setIsSubmitted(true);
        <Navigate to="/lists"/>
      } else {
        setErrorMsg(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMsg(true);
      } else {
        console.error('List form error: ', err);
      }
    }
  }

  return (
    <div className="form-container">
      {errorMsg ? <Navigate to="/lists/error"/> : <Navigate to="/lists/new"/>}
      {isSubmitted ? <Navigate to="/lists"/> : <Navigate to="/lists/new"/>}

      <h3 className="form-title">Create List</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">Name</label>
          <input 
            id="name"
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        <br></br>
        <label htmlFor="description" className="form-label">Description</label>
          <input 
            id="description"
            type="text"
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
          <br></br>
        <button className="form-btn">Create</button>
      </form>
    </div>
  );
}

export default ListForm;