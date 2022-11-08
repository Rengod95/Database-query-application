import React, { useContext } from "react";
import classes from "./styles/RangeController.module.scss";
import TupleCheckBox from "../../../components/UI/TupleCheckBox";
import { DataStateContext } from "../../../store/DataContextProvider";
import RangeCheckBox from "./RangeCheckBox";

const RangeController = ({ searchRangeHandler }) => {
  return (
    <div className={classes.RangeContainer}>
      <div className={classes.Card}>
        <span className={classes.Title}>검색 항목 :</span>
        <RangeCheckBox
          ATTRIBUTE={"NAME"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"SSN"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"BDATE"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"ADDRESS"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"SEX"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"SALARY"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"SUPERVISOR"}
          searchRangeHandler={searchRangeHandler}
        />
        <RangeCheckBox
          ATTRIBUTE={"DEPARTMENT"}
          searchRangeHandler={searchRangeHandler}
        />
      </div>
    </div>
  );
};

export default RangeController;
