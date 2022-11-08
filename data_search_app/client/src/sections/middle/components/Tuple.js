import React, { useContext, useEffect, useState } from "react";
import { DataDispatchContext } from "../../../store/DataContextProvider";
import classes from "./styles/Tuple.module.scss";
import TupleCheckBox from "../../../components/UI/TupleCheckBox";

const Tuple = (props) => {
  const { data, range } = props;

  const dataArr = range
    .map((key) => data[key])
    .filter((val) => val !== undefined);

  return (
    <tr className={classes.tupleContainer}>
      <td className={classes.tupleData}>
        <TupleCheckBox
          NAME={data.NAME}
          SSN={data.SSN}
          className={classes.checkBox}
          onChange={props.checkBoxHandler}
        />
      </td>
      {dataArr.map((val) => {
        return (
          <td key={val} className={classes.tupleData}>
            {val}
          </td>
        );
      })}
    </tr>
  );
};

export default Tuple;
