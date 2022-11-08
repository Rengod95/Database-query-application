import React, { useContext, useEffect, useState } from "react";
import classes from "./styles/TupleList.module.scss";
import Tuple from "./Tuple";
import { DataStateContext } from "../../../store/DataContextProvider";
import { defaultTupleList } from "../../../store/DefaultTupleDataForm";
import useCheckBox from "../../../hooks/useCheckBox";

const TupleList = () => {
  const dataState = useContext(DataStateContext);
  const checkBoxHandler = useCheckBox();
  // useEffect(() => {
  //   setDataRange(dataState.tupleRange);
  // }, [dataState.tupleRange]);

  console.log("튜플 리스트 리렌더링");

  return (
    <div className={classes.listContainer}>
      <div className={classes.tupleViewer}>
        <table className={classes.tupleTable}>
          <thead>
            <tr className={classes.header}>
              {dataState.tupleRange.map((val) => (
                <th key={val}>{val}</th>
              ))}
              {/*<th>선택</th>*/}
              {/*<th>NAME</th>*/}
              {/*<th>SSN</th>*/}
              {/*<th>BDATE</th>*/}
              {/*<th>ADDRESS</th>*/}
              {/*<th>SEX</th>*/}
              {/*<th>SALARY</th>*/}
              {/*<th>SUPERVISOR</th>*/}
              {/*<th>DEPARTMENT</th>*/}
            </tr>
          </thead>
          <tbody>
            {dataState.tupleDataSet.map((_data, idx) => {
              return (
                <Tuple
                  key={_data.SSN}
                  range={dataState.tupleRange}
                  data={_data}
                  checkBoxHandler={checkBoxHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TupleList;
