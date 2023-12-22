import React from "react";

import "./DetailPage.css";

const DetailPage = (props) => {
  return (
    <div className="detail-page">
      <div className="detail-page__container">
        {/* Detail title container */}
        <div className="detail-page__wrap-title">
          <div className="detail-page__name-info">
            <h3 className="detail-page__name">{props.detailResults.name}</h3>
            <span className="detail-page__adddress">
              <i className="fa fa-map-marker"></i>
              <span>{props.detailResults.address}</span>
            </span>
            <span className="detail-page__distance">
              {props.detailResults.distance}
            </span>
            <span className="detail-page__price">
              {props.detailResults.price}
            </span>
          </div>
          <button className="detail-page__button">Reserve or Book Now!</button>
        </div>
        {/* Detail photoes container */}
        <div className="detail-page__imgs">
          {/* Render photo gallery */}
          {props.detailResults.photos.map((curr, index) => (
            <img key={index} src={curr} alt="" className="detail-page__img" />
          ))}
        </div>
        {/* Detail description container */}
        <div className="detail-page__wrap-description">
          {/* Text description container */}
          <div className="detail-page__main-description">
            <h4 className="detail-page__title">{props.detailResults.title}</h4>
            <p className="detail-page__description">
              {props.detailResults.description}
            </p>
          </div>
          {/* Highlight description container */}
          <div className="detail-page__highlight-property">
            <h5 className="detail-page__highlight-choice">
              Perfect for a 9-nights stay!
            </h5>
            <p className="detail-page__highlight-description">
              Located in the real heart of Krakow, this property has an
              excellent location score of 9.8!
            </p>
            <span className="detail-page__highlight-price">
              <strong>${props.detailResults.nine_night_price}</strong> (9
              nights)
            </span>
            <button className="detail-page__highlight-button">
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
