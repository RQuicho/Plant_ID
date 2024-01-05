import React from 'react';

const ListCard = ({list}) => {
  return (
    <div>
      <h3>{list.name}</h3>
      <p>{list.description}</p>
    </div>
  );
}

export default ListCard;