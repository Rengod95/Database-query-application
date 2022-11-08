import React, { useContext } from "react";
import classes from "./styles/LookingUpButton.module.scss";
import APIHandler from "../../../api/APIHandler";
import {
  DataDispatchContext,
  DataStateContext,
} from "../../../store/DataContextProvider";

const LookingUpButton = ({ range, condition }) => {
  const dispatcher = useContext(DataDispatchContext);
  const dataState = useContext(DataStateContext);

  const onClickHandler = async () => {
    try {
      console.log("버튼 상태", range, condition);
      const rangeArr = Array.from(range);
      dispatcher.totalConditionHandler(condition, rangeArr);
      await APIHandler.getTuples(condition, rangeArr).then((res) => {
        dispatcher.totalConditionHandler(condition, rangeArr);
        dispatcher.setTupleDataSet(res.data);
        dispatcher.tupleRangeHandler(rangeArr);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.LookupButtonContainer}>
      <div className={classes.buttonCard}>
        <button className={classes.button} onClick={onClickHandler}>
          조회
        </button>
      </div>
    </div>
  );
};

export default LookingUpButton;
