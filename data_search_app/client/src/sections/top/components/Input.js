import React, { useRef, useState } from "react";
import classes from "./styles/Input.module.scss";

const Input = ({ title, type, inputValueObserver, inputResetHandler }) => {
  const inputRefer = useRef("");
  const [inputValue, setInputValue] = useState('')

  const inputBlurHandler = () => {
    inputValueObserver(inputRefer.current);
  };

  const inputValueHandler = () => {
      setInputValue(inputRefer.current.value)
  }
  


  return (
    <div className={classes.inputContainer}>
      <span className={classes.title}>{title}</span>
      <input
        className={classes.Input}
        type={type}
        title={title}
        ref={inputRefer}
        onBlur={inputBlurHandler}
        onChange={inputValueHandler}
        value={inputValue}
      />
    </div>
  );
};

export default Input;
