import React, { useState, useContext } from 'react';
import PlantIdApi from '../api';
import { Navigate } from 'react-router-dom';
import UserContext from "../UserContext";

const ListForm = () => {
  const {currentUser} = useContext(UserContext);
  const initialState = {
    name: '',
    description: ''
  }
  const [formData, setFormData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [name, setName] = useState('');
  
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
      // const newUserList = await PlantIdApi.addListToUser(currentUser.username, newList.list.name);
      if (newList && newList.list) {
        await PlantIdApi.addListToUser(currentUser.username, newList.list.name);
        console.log('newList in front end from ListForm: ', newList); // good
        console.log('newList.list.name in front end from ListForm: ', newList.list.name); // good
        // console.log('newUserList in front end from ListForm: ', newUserList);
        setIsSubmitted(true);
        console.log('isSubmitted in front end from ListForm: ', isSubmitted);
        <Navigate to="/lists"/>
      } else {
        setErrorMsg(true);
        console.error('Error with with newList in front end from ListForm');
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
    <div>
      {errorMsg ? <Navigate to="/lists/error"/> : <Navigate to="/lists/new"/>}
      {/* {isSubmitted ? <Navigate to={`/lists/${name}`}/> : <Navigate to="/lists/new"/>} */}
      {isSubmitted ? <Navigate to="/lists"/> : <Navigate to="/lists/new"/>}

      <h3>Create List</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
          <input 
            id="name"
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        <label htmlFor="description">Description</label>
          <input 
            id="description"
            type="text"
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        <button>Create</button>
      </form>
    </div>
  );
}

export default ListForm;