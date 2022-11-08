import React, { useContext, useEffect, useState } from "react";
import classes from "./styles/SelectTupleTracker.module.scss";
import { DataStateContext } from "../../../store/DataContextProvider";

const SelectTupleTracker = () => {
  const dataState = useContext(DataStateContext);
  const emps = [...dataState.checkedEmp[0]]
    .map((emp) => {
      return emp.NAME;
    })
    .join(" ");
  const totalSelected = dataState.checkedEmp[1];

  return (
    <div className={classes.Card}>
      <div className={classes.selectedEmp}>선택한 직원:{emps}</div>
      <div className={classes.totalSelected}>인원 수:{totalSelected}</div>
    </div>
  );
};

export default SelectTupleTracker;
