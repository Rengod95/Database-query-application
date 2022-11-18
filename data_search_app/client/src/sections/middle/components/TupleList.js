import React, {useContext, useEffect, useRef, useState} from "react";
import classes from "./styles/TupleList.module.scss";
import Tuple from "./Tuple";
import {DataDispatchContext, DataStateContext} from "../../../store/DataContextProvider";
import { defaultTupleList } from "../../../store/DefaultTupleDataForm";
import useCheckBox from "../../../hooks/useCheckBox";
import APIHandler from "../../../api/APIHandler";

const TupleList = () => {
  const dataState = useContext(DataStateContext);
  const dispatcher = useContext(DataDispatchContext);
  const departmentRefer = useRef("");
  const inputRefer = useRef("")
  const checkBoxHandler = useCheckBox();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dependents, setDependents] = useState([])
    // useEffect(() => {
  //   setDataRange(dataState.tupleRange);
  // }, [dataState.tupleRange]);

  console.log("튜플 리스트 리렌더링");
  const modalFetchHandler = async ()=> {
      await APIHandler.getDependent().then(res => {
          setDependents(prev => res.data)
          modalStateHandler()
      })

  }

  const modalStateHandler = () => {
      setModalIsOpen(prev => !prev)
  }


  const clickHandler = async () => {
      console.log(`부서:${departmentRefer.current.value} 월급: ${inputRefer.current.value}`)
      try {
            await APIHandler.updateByDepartment(
                departmentRefer.current.value,
                inputRefer.current.value
            ).then(() => {
                APIHandler.getTuples(
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
                })});
      } catch (e) {
          console.log(e);
      }
    };

  return (
    <><div className={classes.listContainer}>
      <div className={classes.tupleViewer}>
        <table className={classes.tupleTable}>
          <thead>
            <tr className={classes.header}>
              <th>선택</th>
              {dataState.tupleRange.map((val) => (
                <th key={val}>{val}</th>
              ))}

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
            {dataState.tupleDataSet.map((_data) => {
              return (
                <Tuple
                  key={_data.ssn}
                  range={dataState.tupleRange}
                  data={_data}
                  checkBoxHandler={checkBoxHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.extraContainer}>
        <div className={classes.departmentContainer}>
          <div className={classes.updateTitle}>부서별 월급 일괄 수정하기</div>
          <div className={classes.selectContainer}>
            <select className={classes.extraSelector} ref={departmentRefer}>
                <option value="Research">Research</option>
                <option value="Headquarters">Headquarters</option>
                <option value="Administration">Administration</option>
            </select>
          </div>
          <input
              ref={inputRefer}
              className={classes.inputContainer}
              type="text"
          />
          <div className={classes.buttonContainer}><button onClick={clickHandler} className={classes.button}>수정하기</button></div>
        </div>
          <div className={classes.buttonContainer}>
              <button onClick={modalFetchHandler}  className={classes.button}>직원별 가족 불러오기</button>
          </div>
      </div>
    </div>
        {modalIsOpen && <div className={classes.ModalCard}>
            <button className={classes.close} onClick={modalStateHandler}>
                X
            </button>
            <p>모달창입니다.</p>
            <table>
                <thead>
                    <tr>
                    <th>Essn</th>
                    <th>Dependent_name</th>
                    <th>Sex</th>
                    <th>Bdate</th>
                    <th>Relationship</th>
                    </tr>
                </thead>
                <tbody>
                {dependents.map(dept => {
                    return <tr>{dept.map(val => <td key={val}>{val}</td>)}</tr>
                })}
                    <tr></tr>
                </tbody>
            </table>
        </div>}
    </>
  );
};

export default TupleList;
