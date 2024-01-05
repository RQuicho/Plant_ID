import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ListCard from './ListCard';
import PlantIdApi from '../api';
import UserContext from "../UserContext";

const ListsList = () => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState('');
  const {name} = useParams();

  useEffect(() => {
    const getLists = async() => {
      try {
        setIsLoading(true);
        const response = await PlantIdApi.getListsByUser(currentUser.username);
        console.log('response in front end from ListsList component: ', response);
        setLists(response);
      } catch (err) {
        console.error('Error fetching list data in ListsList component: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    getLists();
  }, [currentUser.username]);

  console.log('lists in front end from ListsList component: ', lists);

  if (lists === null) {
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

      {/* {list.names.map(name => (
        <div key={list.name}>
          <ListCard list={list} />
        </div>
      ))} */}

      {lists.lists.map(list => (
        <div key={list.list_name}>
          <ListCard list={list} />
        </div>
      ))}

      {/* <ListCard list={list} /> */}

      <button>
        <Link to='/lists/new'>Create a list</Link>
      </button>

    </div>
  )


}

export default ListsList;
