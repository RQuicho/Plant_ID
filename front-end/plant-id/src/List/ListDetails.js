import React, { useEffect, useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import ListCard from './ListCard';
import PlantCard from '../Plants/PlantCard';
import PlantIdApi from '../api';
import {Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ListDetails.css";

const ListDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState('');
  const [plants, setPlants] = useState([]);
  const [plantsImgUrl, setPlantsImgUrl] = useState([]);
  const {name} = useParams();

  useEffect(() => {
    const getListDetails = async() => {
      try {
        setIsLoading(true);
        // get list
        const listResponse = await PlantIdApi.getList(name);
        console.log('listResponse in front end from ListDetails component: ', listResponse);
        setList(listResponse);
        // get plant from listPlant
        const plantsResponse = await PlantIdApi.getPlantByListName(name);
        console.log('plantsResponse in front end from ListDetails component: ', plantsResponse);
        console.log('plantsResponse.plants.length in front end from ListDetails component: ', plantsResponse.plants.length);
        setPlants(plantsResponse);
        // get plant image from plants
        const plantImgPromises = plantsResponse.plants.map(async(plant) => {
          const plantImg = await PlantIdApi.getPlant(plant.plant_scientific_name);
          console.log('plantImg in front end from ListDetails component: ', plantImg);
          return plantImg.plantDetails.imageUrl;
        });
        const plantsImages = await Promise.all(plantImgPromises);
        setPlantsImgUrl(plantsImages);
      } catch (err) {
        console.error('Error fetching list in ListDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getListDetails();
  }, [name]);
  console.log('plants in front end from ListDetails component: ', plants);

  const handleClick = async (e, plantName, listName) => {
    e.preventDefault();
    try {
      await PlantIdApi.deletePlantFromList(plantName, listName);
      setPlants((prevPlants) => ({
        plants: prevPlants.plants.filter((plant) => plant.plant_scientific_name !== plantName),
      }));
    } catch (err) {
      console.error('Error deleting list: ', err);
    }
  }

  if (isLoading) {
    return <h1 className="listDetails-loading">Loading   <FontAwesomeIcon icon={faSpinner} className="loading-spinner"/></h1>
  }

  return (
    <div>
      {list.name && (
        <div className="listDetails-title">
          <h1>{list.name}</h1>
          <h5>{list.description}</h5>
        </div>
      )}
     
      {plants.plants && plants.plants.length > 0 ? (
        <div className="listDetails-container">
          {plants.plants.map((plant, index) => (
            <div key={plant.plant_scientific_name} className="listDetails-item">
              <NavLink to={`/plants/${plant.plant_scientific_name}`} className="listDetails-navlink">
                <h5 className="listDetails-name">{plant.plant_scientific_name}</h5>
              </NavLink>
              <img src={plantsImgUrl[index]} alt={`${plant.plant_scientific_name}`} className="listDetails-img"/>
              <FontAwesomeIcon icon={faTrash} onClick={(e) => handleClick(e, plant.plant_scientific_name, plant.list_name)} className="listDetails-trashIcon"/>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>No plants in this list</h3>
          <button>
            <Link to="/lists">Back</Link>
          </button>
        </div>
      )}
   
    </div>
  );
}


export default ListDetails;


