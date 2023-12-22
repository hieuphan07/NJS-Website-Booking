import React from "react";

import "./Type.css";

const Type = (props) => {
  return (
    <div className="types">
      <h2 className="types-title">Browse by property type</h2>
      <div className="types__container">
        {/* Render properties by type from given data */}
        {props.types.map((curr, index) => (
          <div key={index} className="type">
            <img src={curr.image} alt="type" className="type-img" />
            <p className="type-name">{curr.name}</p>
            <p className="type-count">
              {curr.count} {curr.name.toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Type;
