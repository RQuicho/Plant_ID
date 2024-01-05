import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PlantCard from '../Plants/PlantCard';
import ListCard from './ListCard';
import PlantIdApi from '../api';

const ListsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState('');
  const {name} = useParams();

  useEffect(() => {
    const getListData = async() => {
      try {
        setIsLoading(true);
        const response = await PlantIdApi.getList(name);
        console.log('response in front end from ListDetails component: ', response);
        setList(response);
      } catch (err) {
        console.error('Error fetching list data in ListDetails component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getListData();
  }, [name]);

  console.log('list in front end from ListDetails component: ', list);

  if (list === null) {
    return (
      <>
        <h1>No list found</h1>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }
  
  return (
    <div>
      <p>List cards go here</p>
      <ListCard list={list} />

      <button>
        <Link to='/lists/new'>Create a list</Link>
      </button>

    </div>
  )


}

export default ListsList;
