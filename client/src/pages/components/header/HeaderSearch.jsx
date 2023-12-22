import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "./HeaderSearch.css";
import "./Header.css";

const HeaderSearch = (props) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const startDate = format(date[0].startDate, "MM/dd/yyyy");
  const endDate = format(date[0].endDate, "MM/dd/yyyy");

  // useState for Opening/Hiding the date range picker
  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenHandler = () => setIsOpen(!isOpen);

  return (
    <div className="header__search">
      <div className="header__search-item">
        <i className="fa fa-bed"></i>
        <input type="text" placeholder="Where are you going?" />
      </div>
      <div className="header__search-item">
        <i className="fa fa-calendar"></i>
        <span onClick={setIsOpenHandler}>{`${startDate} - ${endDate} `}</span>
        {/* Open/Hide date range picker */}
        {isOpen && (
          <DateRange
            className="header-search__date"
            editableDateInputs={true}
            onChange={(item) => {
              setDate([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={date}
          />
        )}
      </div>
      <div className="header__search-item">
        <i className="fa fa-female"></i>
        <span>1 adult &middot; 0 children &middot; 1 room</span>
      </div>
      <div className="header__search-item">
        {/* Click search button to go to Search page */}
        <button onClick={props.onGoToSearch} className="header__search-button">
          Search
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
