import React, { useRef, useState } from "react";
import classes from "./styles/Input.module.scss";

const Input = ({ title, type, inputValueObserver }) => {
  const inputRefer = useRef("");

  const inputBlurHandler = () => {
    inputValueObserver(inputRefer.current);
  };

  return (
    <div className={classes.inputContainer}>
      <span className={classes.title}>{title}</span>
      <input
        className={classes.Input}
        type={type}
        title={title}
        ref={inputRefer}
        onBlur={inputBlurHandler}
      />
    </div>
  );
};

export default Input;
