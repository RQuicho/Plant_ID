import React, { useEffect, useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import ListCard from './ListCard';
import PlantCard from '../Plants/PlantCard';
import PlantIdApi from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState('');
  const [plants, setPlants] = useState([]);
  const [plantImgUrl, setPlantImgUrl] = useState('');
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
        setPlantImgUrl(plantsImages);
      } catch (err) {
        console.error('Error fetching list in ListDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getListDetails();
  }, [name]);
  console.log('plants in front end from ListDetails component: ', plants);

  const handleClick = async (e, plantName) => {
    e.preventDefault();
    try {
      await PlantIdApi.deletePlantFromList(plantName);
      setPlants((prevPlants) => ({
        plants: prevPlants.plants.filter((plant) => plant.plant_scientific_name !== plantName),
      }));
    } catch (err) {
      console.error('Error deleting list: ', err);
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <div>
      <p>List card and Plant cards go here</p>

      {list.name && (
        <>
          <h1>{list.name}</h1>
          <h3>{list.description}</h3>
        </>
      )}
     
      {plants.plants && plants.plants.length > 0 ? (
        <>
          {plants.plants.map(plant => (
            <div key={plant.plant_scientific_name}>
              <NavLink to={`/plants/${plant.plant_scientific_name}`}>
                {plant.plant_scientific_name}
                <img src={plantImgUrl} alt={`${plant.plant_scientific_name}`} />
              </NavLink>
              <FontAwesomeIcon icon={faTrash} onClick={(e) => handleClick(e, plant.plant_scientific_name)}/>
            </div>
          ))}
        </>
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


