import React from "react";

import "./HotelList.css";

const HotelList = (props) => {
  return (
    <div className="hotel-list">
      <h2 className="hotel-list__title">Homes guest love</h2>
      <div className="hotel-list__container">
        {/* Render hotel list from given data */}
        {props.hotelLists.map((curr, index) => (
          <div className="hotel-list__item" key={index}>
            <img
              src={curr.image_url}
              alt="hotels"
              className="hotel-list__img"
            />
            <div className="hotel-list__information">
              <h3 className="hotel-list__name">{curr.name}</h3>
              <p className="hotel-list__city">{curr.city}</p>
              <p className="hotel-list__price">{`Starting from $${curr.price}`}</p>
              <div className="hotel-list__review">
                <span className="hotel-list__rate">{curr.rate}</span>
                <span className="hotel-list__type">{curr.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
