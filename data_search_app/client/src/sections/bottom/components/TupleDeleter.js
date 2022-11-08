import React, { useContext } from "react";
import classes from "./styles/TupleDeleter.module.scss";
import { DataStateContext } from "../../../store/DataContextProvider";
import APIHandler from "../../../api/APIHandler";

const TupleDeleter = () => {
  const dataState = useContext(DataStateContext);

  const deleteClickHandler = () => {
    APIHandler.deleteTuple(dataState.checkedEmp);
  };

  return (
    <div className={classes.Card}>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={deleteClickHandler}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default TupleDeleter;
