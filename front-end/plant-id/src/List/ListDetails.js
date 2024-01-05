import React, { useEffect, useState } from 'react';
import ListCard from './ListCard';
import { Link } from 'react-router-dom';
import PlantIdApi from '../api';


const ListDetails = () => {
  const [isLoading, setIsLoading] = useState('');
  const [list, setList] = useState('');

  useEffect(() => {
    
  })

  // PlantIdApi.getList(name)

  // if (!list) {
  //   return (
  //     <div>
  //       <h3>No lists</h3>
  //       <button>
  //         <Link to='/lists/new'>Create a list</Link>
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <p>List card and Plant cards go here</p>
      {/* <ListCard list={list} /> */}


      {/* {list.names.map(name => (
        <div key={list.name}>
          <ListCard list={list} />
        </div>
      ))} */}
      {/* <PlantCard plant={plant} /> */}


   
    </div>
  )
}

export default ListDetails;