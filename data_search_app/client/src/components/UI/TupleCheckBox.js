import React, { useContext, useEffect, useState } from "react";
import { DataDispatchContext } from "../../store/DataContextProvider";
import classes from "./CheckBox.module.scss";

const TupleCheckBox = ({ NAME, SSN, onChange }) => {
  const dispatcher = useContext(DataDispatchContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      onChange.tupleSelector({ NAME, SSN });
    } else {
      onChange.tupleSelectCanceler({ NAME, SSN });
    }
  }, [isChecked]);

  const checkBoxTupleChangeHandler = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <input
      type="checkbox"
      onChange={checkBoxTupleChangeHandler}
      defaultChecked={isChecked}
      className={classes.checkBox}
    />
  );
};

export default TupleCheckBox;
