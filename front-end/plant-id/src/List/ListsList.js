import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PlantCard from '../Plants/PlantCard';
import PlantIdApi from '../api';
import NotFound from '../NotFoundErrors/NotFound';

const ListsList = () => {
  const [plant, setPlant] = useState('');
  const {scientificName} = useParams();

  useEffect(() => {
    const getPlantData = async() => {
      try {
        const resp = await PlantIdApi.getPlant(scientificName);
        setPlant(resp);
      } catch (err) {
        console.error('Error fetching plant data in ListsList component', err);
      }
    };
    getPlantData();
  }, [scientificName]);

  if (plant === null || (plant && !plant.scientificName)) {
    return (
      <>
        <NotFound />
      </>
    )
  }

  return (
    <div>
      <PlantCard plant={plant} />
    </div>
  );

}

export default ListsList;