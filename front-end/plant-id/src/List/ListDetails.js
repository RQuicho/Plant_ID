import React, { useEffect, useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import ListCard from './ListCard';
import PlantCard from '../Plants/PlantCard';
import PlantIdApi from '../api';


const ListDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState('');
  const [plants, setPlants] = useState([]);
  const {name} = useParams();

  useEffect(() => {
    const getListDetails = async() => {
      try {
        setIsLoading(true);
        // get list
        const listResponse = await PlantIdApi.getList(name);
        console.log('listResponse in front end from ListDetails component: ', listResponse);
        setList(listResponse);
        // get plant
        const plantsResponse = await PlantIdApi.getPlantByListName(name);
        console.log('plantsResponse in front end from ListDetails component: ', plantsResponse);
        console.log('plantsResponse.plants.length in front end from ListDetails component: ', plantsResponse.plants.length);
        setPlants(plantsResponse);

        if (plantsResponse.plants.length === 0) {
          return (
            <div>
              <h3>No plants in this list</h3>
              <button>
                <Link to='/lists'>Back</Link>
              </button>
            </div>
          );
        }
      } catch (err) {
        console.error('Error fetching list in ListDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getListDetails();
  }, [name]);

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
     
      {plants.plants && (
        <>
          {plants.plants.map(plant => (
            <div key={plant.plant_id}>
              <NavLink to={`/plants/${plant.scientificName}`}>
                {/* <PlantCard plant={plant} /> */}
                {plant.plant_id}
              </NavLink>
            </div>
          ))}
        </>
      )}
      
   
    </div>
  )
}

export default ListDetails;