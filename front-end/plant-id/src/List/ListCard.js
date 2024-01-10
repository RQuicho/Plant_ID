import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ListCard.css";

const ListCard = ({list}) => {
  return (
    <div className="listCard-container">
      <h3 className="listCard-title">{list.list_name}</h3>
    </div>
  );
}

export default ListCard;