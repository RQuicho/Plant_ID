import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import ListCard from './ListCard';
import PlantIdApi from '../api';
import UserContext from "../UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ListsList.css";

const ListsList = () => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState('');

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

  const handleClick = async (e, listName) => {
    e.preventDefault();
    try {
      await PlantIdApi.deleteList(listName);
      setLists((prevLists) => ({
        lists: prevLists.lists.filter((list) => list.list_name !== listName),
      }));
    } catch (err) {
      console.error('Error deleting list: ', err);
    }
  }

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
      <h1 className="listsList-title">Lists</h1>
      {lists.lists && (
        <>
          {lists.lists.map(list => (
            <div key={list.list_name} className="listsList-item">
              <NavLink to={`/lists/${list.list_name}`} className="listsList-navlink">
                {/* <ListCard list={list} /> */}
                <h3 className="listsList-name">{list.list_name}</h3>
              </NavLink>
              <FontAwesomeIcon icon={faTrash} onClick={(e) => handleClick(e, list.list_name)} className="listsList-trashIcon"/>
            </div>
          ))}
        </>
      )}
      <button className="listsList-btn">
        <Link to='/lists/new' >Create a list</Link>
      </button>

    </div>
  )


}

export default ListsList;
