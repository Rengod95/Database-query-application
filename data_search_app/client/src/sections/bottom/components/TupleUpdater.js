import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./styles/TupleUpdater.module.scss";
import useTupleUpdater from "../../../hooks/useTupleUpdater";

const TupleUpdater = () => {
  const { selectRefer, inputRefer, dataState, dispatcher, clickHandler } =
    useTupleUpdater();

  return (
    <div className={classes.Card}>
      <div className={classes.selectContainer}>
        <span className={classes.span}>수정:</span>
        <select ref={selectRefer} className={classes.selector}>
          <option value="address">ADDRESS</option>
          <option value="sex">SEX</option>
          <option value="salary">SALARY</option>
        </select>
        <input
          ref={inputRefer}
          className={classes.inputContainer}
          type="text"
        />
        <div className={classes.buttonContainer}>
          <button className={classes.button} onClick={clickHandler}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TupleUpdater;
