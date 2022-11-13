import React, { useContext } from "react";
import classes from "./styles/TupleDeleter.module.scss";
import {DataDispatchContext, DataStateContext} from "../../../store/DataContextProvider";
import APIHandler from "../../../api/APIHandler";

const TupleDeleter = () => {
  const dataState = useContext(DataStateContext);
  const dispatcher = useContext(DataDispatchContext)
  const deleteClickHandler = async () => {
    await APIHandler.deleteTuple(dataState.checkedEmp).then(res=>{
      APIHandler.getTuples(
          dataState.totalCondition.searchCondition,
          dataState.totalCondition.searchRange
      ).then((res) => {
        dispatcher.setTupleDataSet(res.data);
      });
    }).catch(e => console.log(e));
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
