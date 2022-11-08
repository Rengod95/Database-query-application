import React, { useContext, useRef, useState } from "react";
import Input from "./Input";
import classes from "./styles/TupleCreateForm.module.scss";
import APIHandler from "../../../api/APIHandler";
import { DataDispatchContext } from "../../../store/DataContextProvider";

const defaultTupleForm = {
  FirstName: undefined,
  MiddleInit: undefined,
  LastName: undefined,
  Ssn: undefined,
  Birthdate: undefined,
  Address: undefined,
  Sex: "F",
  Salary: undefined,
  SuperSsn: undefined,
  Dno: undefined,
};

const TupleCreateForm = () => {
  const [inputForm, setInputForm] = useState(defaultTupleForm);
  const selectRefer = useRef("F");
  const dispatcher = useContext(DataDispatchContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await setInputForm((prevState) => {
      return {
        ...prevState,
        [selectRefer.current.title]: selectRefer.current.value,
      };
    });
    try {
      delete inputForm[undefined];
      await APIHandler.createTuple(inputForm);
      await APIHandler.getTuples(
        {
          mainCondition: "DEFAULT",
          subCondition: "DEFAULT",
        },
        [
          "NAME",
          "SSN",
          "BDATE",
          "ADDRESS",
          "SEX",
          "SALARY",
          "SUPERVISOR",
          "DEPARTMENT",
        ]
      ).then((res) => {
        dispatcher.setTupleDataSet(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const inputValueObserver = (refer) => {
    setInputForm((prevState) => {
      return {
        ...prevState,
        [refer.title]: refer.value,
      };
    });
  };

  return (
    <div className={classes.FormContainer}>
      <div className={classes.Card}>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <span className={classes.span}>신규 직원 정보 추가</span>
          <Input
            type={"text"}
            title={"FirstName"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"MiddleInit"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"LastName"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"Ssn"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"date"}
            title={"Birthdate"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"Address"}
            inputValueObserver={inputValueObserver}
          />
          <div className={classes.selectContainer}>
            <span className={classes.selectSpan}>SEX</span>
            <select
              className={classes.select}
              onChange={inputValueObserver}
              title={"SEX"}
              defaultValue={"F"}
            >
              <option value="F">F</option>
              <option value={"M"}>M</option>
            </select>
          </div>
          <Input
            type={"text"}
            title={"Salary"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"SuperSsn"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"Dno"}
            inputValueObserver={inputValueObserver}
          />
          <button className={classes.button}>정보 추가하기</button>
        </form>
      </div>
    </div>
  );
};

export default TupleCreateForm;
