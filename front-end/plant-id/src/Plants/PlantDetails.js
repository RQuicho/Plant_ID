import React, { useEffect } from 'react';
import PlantIdApi from "../api";
import NotFound from '../ErrorSuccessMessages/NotFound';

const PlantDetails = () => {
  // const [plant, setPlant] = useState({});
  // const scientificName = 
  
  // useEffect(() => {
  //   const getPlantDetails = async() => {
  //     try {
  //       const response = await PlantIdApi.getPlant(scientificName);
  //       setPlant(response);
  //     } catch (err) {
  //       console.error('Error fetching plant detials in PlantDetails component', err);
  //     }
  //   }
  //   getPlantDetails();
  // }, [scientificName]);

  // if (plant === null || (plant && !plant.scientificName)) {
  //   return (
  //     <>
  //       <NotFound />
  //     </>
  //   );
  // }

  return (
    <div>
      <p>Plant Details go here</p>
    </div>
  );

}

export default PlantDetails;


