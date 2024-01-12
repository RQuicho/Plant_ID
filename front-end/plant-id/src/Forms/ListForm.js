import React, { useState, useContext } from 'react';
import PlantIdApi from '../api';
import { Link, Navigate } from 'react-router-dom';
import UserContext from "../UserContext";
import {Form, FormGroup, Col, Label, Input} from 'reactstrap';
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
    <div>
      {errorMsg ? <Navigate to="/lists/error"/> : <Navigate to="/lists/new"/>}
      {isSubmitted ? <Navigate to="/lists"/> : <Navigate to="/lists/new"/>}

      <h3 className="form-title">Create List</h3>
      <Form onSubmit={handleSubmit} className="form-container">
        <FormGroup row>
          <Label for="name" sm={2} className="form-label">Name</Label>
          <Col sm={10}>
            <Input 
              id="name"
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2} className="form-label">Description</Label>
          <Col sm={10}>
            <Input 
              id="description"
              type="text"
              name="description"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <br></br>
        <button className="form-btn">Create</button>
      </Form>
      <div className="form-btnContainer">
        <button className="form-btn">
          <Link to='/lists' className="form-backBtn">Back</Link>
        </button>
      </div>
    </div>
  );
}

export default ListForm;