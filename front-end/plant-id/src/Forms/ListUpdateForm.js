import React, { useState } from 'react';
import PlantIdApi from '../api';
import { Navigate, useParams } from 'react-router-dom';


const ListUpdateForm = () => {
  const {name} = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    description: ''
  });
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listData = {
      description: formData.description,
    };
    let updatedList;
    try {
      updatedList = await PlantIdApi.patchList(name, formData);
      console.log('updatedList in front end from ListUpdatedForm: ', updatedList);
      if (updatedList) {
        setIsSubmitted(true);
      } else {
        console.log('No updated list');
      }
    } catch (err) {
      console.error('Error updating list', err);
      return;
    }
    setIsSubmitted(true);
    console.log('isSubmitted in front end from ListUpdatedForm: ', isSubmitted);
  }

  return (
    <div>
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

export default ListUpdateForm;