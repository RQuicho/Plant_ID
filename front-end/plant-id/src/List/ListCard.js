import React from 'react';

const ListCard = ({list}) => {
  return (
    <div>
      <h3>{list.list_name}</h3>
      {/* Need to change userList database to include list description */}
      {/* <p>{list.description}</p> */}
    </div>
  );
}

export default ListCard;