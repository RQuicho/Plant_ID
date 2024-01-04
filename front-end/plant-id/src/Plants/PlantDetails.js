import React, { useEffect, useState } from 'react';
import PlantIdApi from "../api";
import NotFound from '../ErrorSuccessMessages/NotFound';
import { useParams } from 'react-router-dom';

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
        console.error('Error fetching plant detials in PlantDetails component', err);
      } finally {
        setIsLoading(false);
      }
    };
    getPlantDetails();
  }, [scientificName]);

  console.log('plant in front end from PlantDetails component: ', plant);

  // if (plant === null || (plant && !plant.scientificName)) {
  //   return (
  //     <>
  //       <NotFound />
  //     </>
  //   );
  // }

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <div>
      <p>Plant Details go here</p>
      <img src={plant.plantDetails.imageUrl} alt={`${plant.plantDetails.commonName}`} />
      <h3>{plant.plantDetails.commonName}</h3>
      <p>{plant.plantDetails.scientificName}</p>
      <p>{plant.plantDetails.vegetable}</p>
      <p>{plant.plantDetails.ediblePart}</p>
      <p>{plant.plantDetails.edible}</p>
      <p>{plant.plantDetails.flowerColor}</p>
      <p>{plant.plantDetails.foliageTexture}</p>
      <p>{plant.plantDetails.foliageColor}</p>
      <p>{plant.plantDetails.fruitOrSeedColor}</p>
      <p>{plant.plantDetails.fruitOrSeedShape}</p>
      <p>{plant.plantDetails.growthForm}</p>
      <p>{plant.plantDetails.growthHabit}</p>
      <p>{plant.plantDetails.toxicity}</p>
		
		{/* "imageUrl": "https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188",
		"vegetable": false,
		"ediblePart": null,
		"edible": false,
		"flowerColor": null,
		"foliageTexture": null,
		"foliageColor": null,
		"fruitOrSeedColor": null,
		"fruitOrSeedShape": null,
		"growthForm": null,
		"growthHabit": null,
		"toxicity": null */}
    </div>
  );

}

export default PlantDetails;


