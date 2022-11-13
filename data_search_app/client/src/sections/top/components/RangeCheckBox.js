import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./styles/RangeController.module.scss";
import { DataDispatchContext } from "../../../store/DataContextProvider";

const RangeCheckBox = ({ ATTRIBUTE, searchRangeHandler }) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    searchRangeHandler(ATTRIBUTE.toLowerCase());
  }, [isChecked]);

  const checkBoxRangeChangeHandler = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={classes.checkBoxContainer}>
      <label>{ATTRIBUTE}</label>
      <input
        type={"checkbox"}
        className={classes.checkBox}
        onChange={checkBoxRangeChangeHandler}
        defaultChecked={isChecked}
      />
    </div>
  );
};

export default RangeCheckBox;
