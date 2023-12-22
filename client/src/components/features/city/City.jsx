import React from "react";

import "./City.css";

const City = (props) => {
  return (
    <div className="cities">
      <div className="cities__container">
        {/* Render cites from given data */}
        {props.cities.map((curr, index) => (
          <div key={index} className="city">
            <img src={curr.image} alt="city" className="city__img" />
            <div className="city__text">
              <h3 className="city__name">{curr.name}</h3>
              <p className="city__sub-text">{curr.subText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default City;
