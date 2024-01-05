import React, { useEffect, useState } from 'react';
import PlantIdApi from "../api";
import NotFound from '../ErrorSuccessMessages/NotFound';
import { useParams } from 'react-router-dom';
import PlantCard from './PlantCard';

const PlantDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plant, setPlant] = useState({});
  const {scientificName} = useParams();
  console.log('scientificName in front end from PlantDetail component: ', scientificName);
  
  useEffect(() => {
    const getPlantDetails = async() => {
      try {
        setIsLoading(true);
        const response = await PlantIdApi.getPlant(scientificName);
        console.log('response in front end from PlantDetails component: ', response);
        setPlant(response);
      } catch (err) {
        console.error('Error fetching plant detials in PlantDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getPlantDetails();
  }, [scientificName]);

  console.log('plant in front end from PlantDetails component: ', plant);

  if (plant === null) {
    return (
      <>
        <h1>No plant found</h1>
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
      <form>
        <button>Add Plant to List</button>
        <p>Have a drop down of user created lists</p>
      </form>
    </div>
  );

}

export default PlantDetails;