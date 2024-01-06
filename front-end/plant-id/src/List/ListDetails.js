import React, { useEffect, useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import ListCard from './ListCard';
import PlantCard from '../Plants/PlantCard';
import PlantIdApi from '../api';


const ListDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState('');
  const [plants, setPlant] = useState('');
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
        setPlant(plantsResponse);
      } catch (err) {
        console.error('Error fetching list in ListDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getListDetails();
  }, [name]);

  if (!list || !plants) {
    return (
      <div>
        <h3>No list/plants</h3>
        <button>
          <Link to='/lists'>Back</Link>
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <div>
      <p>List card and Plant cards go here</p>
     
      {plants.plants && (
        <>
          {plants.plants.map(plant => (
            <div key={plant.id}>
              <NavLink to={`/plants/${plant.scientificName}`}>
                <PlantCard plant={plant} />
              </NavLink>
            </div>
          ))}
        </>
      )}
      
   
    </div>
  )
}

export default ListDetails;