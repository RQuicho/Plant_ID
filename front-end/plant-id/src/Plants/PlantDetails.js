import React, { useEffect, useState, useContext } from 'react';
import PlantIdApi from "../api";
import { Link, Navigate, useParams } from 'react-router-dom';
import UserContext from '../UserContext';
import {Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PlantDetails.css";

const PlantDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [plant, setPlant] = useState({});
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const {scientificName} = useParams();
  const {currentUser} = useContext(UserContext);
  
  useEffect(() => {
    const getPlantDetails = async() => {
      try {
        setIsLoading(true);
        // plant
        const plantResp = await PlantIdApi.getPlant(scientificName);
        setPlant(plantResp);
        // lists
        const listsResp = await PlantIdApi.getListsByUser(currentUser.username);
        setLists(listsResp);
        if (listsResp.lists.length === 1) {
          setSelectedList(listsResp.lists[0].list_name);
        }
      } catch (err) {
        console.error('Error fetching plant detials in PlantDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getPlantDetails();
  }, [scientificName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await PlantIdApi.addPlantToList(selectedList, plant.plantDetails.scientificName);
    if (result) {
      setIsSubmitted(true);
      return <Navigate to={`/plants/${scientificName}/success`} />;
    } else {
      console.error('Error adding plant to list');
    }
  }

  if (!plant) {
    return (
      <>
        <h1>No plant found</h1>
      </>
    );
  }

  if (!lists) {
    return (
      <>
        <h1>No lists found</h1>
      </>
    );
  }

  if (isLoading) {
    return <h1 className="plantDetails-loading">Loading   <FontAwesomeIcon icon={faSpinner} className="loading-spinner"/></h1>
  }

  return (
    <div>
      {plant.plantDetails && (
        <>
          <h1 className="plantDetails-title">{`${plant.plantDetails.scientificName} (${plant.plantDetails.commonName})`}</h1>
          <div className="plantDetails-dataContainer">
            <Row md="2" sm="1" xs="1">
              <Col className="plantDetails-infoContainer">
                <h4 className="plantDetails-info">Plant Details</h4>
                <p className="plantDetails-info">Vegetable: {plant.plantDetails.vegetable !== null ? plant.plantDetails.vegetable.toString() : "null"}</p>
                <p className="plantDetails-info">Edible Part: {plant.plantDetails.ediblePart !== null ? plant.plantDetails.ediblePart.toString() : "null"}</p>
                <p className="plantDetails-info">Edible: {plant.plantDetails.edible !== null ? plant.plantDetails.edible.toString() : "null"}</p>
                <p className="plantDetails-info">Flower Color: {plant.plantDetails.flowerColor !== null ? plant.plantDetails.flowerColor.toString() : "null"}</p>
                <p className="plantDetails-info">Foliage Texture: {plant.plantDetails.foliageTexture !== null ? plant.plantDetails.foliageTexture.toString() : "null"}</p>
                <p className="plantDetails-info">Foliage Color: {plant.plantDetails.foliageColor !== null ? plant.plantDetails.foliageColor.toString() : "null"}</p>
                <p className="plantDetails-info">Fruit or Seed Color: {plant.plantDetails.fruitOrSeedColor !== null ? plant.plantDetails.fruitOrSeedColor.toString() : "null"}</p>
                <p className="plantDetails-info">Fruit or Seed Shape: {plant.plantDetails.fruitOrSeedShape !== null ? plant.plantDetails.fruitOrSeedShape.toString() : "null"}</p>
                <p className="plantDetails-info">Growth Form: {plant.plantDetails.growthForm !== null ? plant.plantDetails.growthForm.toString() : "null"}</p>
                <p className="plantDetails-info">Growth Habit: {plant.plantDetails.growthHabit !== null ? plant.plantDetails.growthHabit.toString() : "null"}</p>
                <p className="plantDetails-info">Toxicity: {plant.plantDetails.toxicity !== null ? plant.plantDetails.toxicity.toString() : "null"}</p>
              </Col>
              <Col className="plantDetails-imgContainer">
                <img src={plant.plantDetails.imageUrl} alt={`${plant.plantDetails.commonName}`} className="plantDetails-img"/>
              </Col>
            </Row>
          </div>
        </>
      )}

      {lists.lists && (
        <>
          <div>
            {isSubmitted ? <Navigate to={`/plants/${scientificName}/success`} /> : <Navigate to={`/plants/${scientificName}`} />}
            <form onSubmit={handleSubmit}>
              <label htmlFor="lists" className="plantDetails-listLabel">Choose a list:</label>
              <select 
                name="lists" 
                id="lists"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                {lists.lists.map(list => (
                  <option value={`${list.list_name}`} key={list.list_name} className="plantDetails-listOptions">
                    {list.list_name}
                  </option>
                ))}
                </select>
                <button className="plantDetails-btn">Add plant</button>
              </form>
            </div>
        </>
      )}
      <button className="plantDetails-btn">
        <Link to='/upload' className="plantDetails-backBtn">Back</Link>
      </button>
    
    </div>
  );

}

export default PlantDetails;