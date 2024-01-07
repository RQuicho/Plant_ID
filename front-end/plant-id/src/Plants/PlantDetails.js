import React, { useEffect, useState, useContext } from 'react';
import PlantIdApi from "../api";
import NotFound from '../ErrorSuccessMessages/NotFound';
import { Navigate, useParams } from 'react-router-dom';
import PlantCard from './PlantCard';
import ListCard from '../List/ListCard';
import UserContext from '../UserContext';

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
        console.log('plantResp in front end from PlantDetails component: ', plantResp);
        setPlant(plantResp);
        // lists
        const listsResp = await PlantIdApi.getListsByUser(currentUser.username);
        console.log('listsResp in front end from PlantDetails component: ', listsResp);
        setLists(listsResp);
      } catch (err) {
        console.error('Error fetching plant detials in PlantDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getPlantDetails();
  }, [scientificName]);

  console.log('plant in front end from PlantDetails component: ', plant);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await PlantIdApi.addPlantToList(selectedList, plant.plantDetails.scientificName); // change listplant db from plant_id to scientific_name

    console.log('result in front end from PlantDetails handleSubmit: ', result);
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
    return <p>Loading &hellip;</p>
  }

  return (
    <div>
      <p>Plant Details go here</p>
      {plant.plantDetails && (
        <>
          <PlantCard plant={plant} />
          <p>Vegetable: {plant.plantDetails.vegetable !== null ? plant.plantDetails.vegetable.toString() : "null"}</p>
          <p>Edible Part: {plant.plantDetails.ediblePart !== null ? plant.plantDetails.ediblePart.toString() : "null"}</p>
          <p>Edible: {plant.plantDetails.edible !== null ? plant.plantDetails.edible.toString() : "null"}</p>
          <p>Flower Color: {plant.plantDetails.flowerColor !== null ? plant.plantDetails.flowerColor.toString() : "null"}</p>
          <p>Foliage Texture: {plant.plantDetails.foliageTexture !== null ? plant.plantDetails.foliageTexture.toString() : "null"}</p>
          <p>Foliage Color: {plant.plantDetails.foliageColor !== null ? plant.plantDetails.foliageColor.toString() : "null"}</p>
          <p>Fruit or Seed Color: {plant.plantDetails.fruitOrSeedColor !== null ? plant.plantDetails.fruitOrSeedColor.toString() : "null"}</p>
          <p>Fruit or Seed Shape: {plant.plantDetails.fruitOrSeedShape !== null ? plant.plantDetails.fruitOrSeedShape.toString() : "null"}</p>
          <p>Growth Form: {plant.plantDetails.growthForm !== null ? plant.plantDetails.growthForm.toString() : "null"}</p>
          <p>Growth Habit: {plant.plantDetails.growthHabit !== null ? plant.plantDetails.growthHabit.toString() : "null"}</p>
          <p>Toxicity: {plant.plantDetails.toxicity !== null ? plant.plantDetails.toxicity.toString() : "null"}</p>
        </>
      )}

      {lists.lists && (
        <>
          <div>
            {isSubmitted ? <Navigate to={`/plants/${scientificName}/success`} /> : <Navigate to={`/plants/${scientificName}`} />}
            <form onSubmit={handleSubmit}>
              <label htmlFor="lists">Choose a list:</label>
              <select 
                name="lists" 
                id="lists"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                {lists.lists.map(list => (
                  <option value={`${list.list_name}`} key={list.list_name}>
                    {list.list_name}
                  </option>
                ))}
                </select>
                <button>Add plant</button>
              </form>
            </div>
        </>
      )}

    </div>
  );

}

export default PlantDetails;