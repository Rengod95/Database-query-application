import React, { useContext, useEffect, useState } from "react";
import { DataDispatchContext } from "../../../store/DataContextProvider";
import classes from "../../../components/UI/CheckBox.module.scss";

const TupleCheckBox = ({ name, ssn, onChange }) => {
  const dispatcher = useContext(DataDispatchContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      onChange.tupleSelector({ name, ssn });
    } else {
      onChange.tupleSelectCanceler({ name, ssn });
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
