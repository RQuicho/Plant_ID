import React, { useEffect, useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import PlantIdApi from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CardGroup, Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';
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
        setList(listResponse);
        // get plant from listPlant
        const plantsResponse = await PlantIdApi.getPlantByListName(name);
        setPlants(plantsResponse);
        // get plant image from plants
        const plantImgPromises = plantsResponse.plants.map(async(plant) => {
          const plantImg = await PlantIdApi.getPlant(plant.plant_scientific_name);
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
        <CardGroup className="listDetails-container">
          {plants.plants.map((plant, index) => (
            <Card key={plant.plant_scientific_name} className="listDetails-item">
              <CardImg 
                className="listDetails-img"
                alt={`${plant.plant_scientific_name}`}
                src={plantsImgUrl[index]}
                top
                width="100%"
              />
              <CardBody>
                <CardTitle tag="h5">
                  <NavLink to={`/plants/${plant.plant_scientific_name}`} className="listDetails-navlink">
                    <h4 className="listDetails-name">{plant.plant_scientific_name}</h4>
                  </NavLink>
                </CardTitle>
                <div className="listDetails-trashContainer">
                  <FontAwesomeIcon icon={faTrash} size='lg' onClick={(e) => handleClick(e, plant.plant_scientific_name, plant.list_name)} className="listDetails-trashIcon"/>
                </div>
              </CardBody>
            </Card>
          ))}
        </CardGroup>
      ) : (
        <div>
          <h3 className="listDetails-title">No plants in this list</h3>
        </div>
      )}
      <div className="form-btnContainer">
        <button className="listDetails-btn">
          <Link to="/lists" className="listDetails-backBtn">Back</Link>
        </button>
      </div>
    </div>
  );
}

export default ListDetails;