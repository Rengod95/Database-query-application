import React, { useContext, useRef, useState } from "react";
import Input from "./Input";
import classes from "./styles/TupleCreateForm.module.scss";
import APIHandler from "../../../api/APIHandler";
import { DataDispatchContext } from "../../../store/DataContextProvider";

const defaultTupleForm = {
  firstName: undefined,
  middleInit: undefined,
  lastName: undefined,
  ssn: undefined,
  birthDate: undefined,
  address: undefined,
  sex: "F",
  salary: undefined,
  superSsn: undefined,
  dno: undefined,
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
          "name",
          "ssn",
          "bdate",
          "address",
          "sex",
          "salary",
          "supervisor",
          "department",
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
            title={"firstName"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"middleInit"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"lastName"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"ssn"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"date"}
            title={"birthDate"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"address"}
            inputValueObserver={inputValueObserver}
          />
          <div className={classes.selectContainer}>
            <span className={classes.selectSpan}>sex</span>
            <select
              className={classes.select}
              onChange={inputValueObserver}
              title={"sex"}
              defaultValue={"F"}
            >
              <option value="F">F</option>
              <option value={"M"}>M</option>
            </select>
          </div>
          <Input
            type={"text"}
            title={"salary"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"superSsn"}
            inputValueObserver={inputValueObserver}
          />
          <Input
            type={"text"}
            title={"dno"}
            inputValueObserver={inputValueObserver}
          />
          <button className={classes.button}>정보 추가하기</button>
        </form>
      </div>
    </div>
  );
};

export default TupleCreateForm;
