import React, { useContext, useRef } from "react";
import {
  DataDispatchContext,
  DataStateContext,
} from "../store/DataContextProvider";
import APIHandler from "../api/APIHandler";

const useTupleUpdater = () => {
  const selectRefer = useRef("");
  const inputRefer = useRef("");
  const dataState = useContext(DataStateContext);
  const dispatcher = useContext(DataDispatchContext);

  const clickHandler = async () => {
    console.log(dataState.totalCondition);

    try {
      await APIHandler.updateTupleAttribute(
        dataState.checkedEmp,
        selectRefer.current.value,
        inputRefer.current.value
      ).then(() => {
        APIHandler.getTuples(
          dataState.totalCondition.searchCondition,
          dataState.totalCondition.searchRange
        ).then((res) => {
          dispatcher.setTupleDataSet(res.data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    selectRefer,
    inputRefer,
    dataState,
    dispatcher,
    clickHandler,
  };
};

export default useTupleUpdater;
