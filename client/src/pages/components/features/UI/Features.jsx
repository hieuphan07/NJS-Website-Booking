import React from "react";

import City from "../city/City";
import Type from "../type/Type";
import HotelList from "../hotelList/HotelList";

import "./Features.css";

const Features = (props) => {
  return (
    <div className="features">
      <div className="features__container">
        <City cities={props.cities} />
        <Type types={props.types} />
        <HotelList hotelLists={props.hotelLists} />
      </div>
    </div>
  );
};

export default Features;
