import React from "react";
import classes from "./styles/SelectBox.module.scss";
import useSelectBox from "../../../hooks/useSelectBox";

const SelectBox = ({ searchConditionHandler, children }) => {
  const {
    mainSelectRefer,
    subSelectRefer,
    mainSelected,
    mainSelectorHandler,
    subSelectorHandler,
  } = useSelectBox(searchConditionHandler);

  return (
    <div className={classes.SelectContainer}>
      <div className={classes.Card}>
        <div className={classes.mainSelectContainer}>
          검색 범위
          <select
            ref={mainSelectRefer}
            onChange={mainSelectorHandler}
            className={classes.rangeSelector}
            onBlur={subSelectorHandler}
          >
            <option value="DEFAULT">DEFAULT</option>
            <option value="DEPARTMENT">DEPARTMENT</option>
            <option value="SEX">SEX</option>
            <option value="SALARY">SALARY</option>
            <option value="BDATE">BDATE</option>
            <option value="SUBORDINATE">SUBORDINATE</option>
          </select>
        </div>
        <div className={classes.subSelectContainer}>
          세부 조건
          {mainSelected !== "SALARY" && mainSelected !== "SUBORDINATE" ? (
            <select
              ref={subSelectRefer}
              className={classes.rangeSelector}
              onChange={subSelectorHandler}
            >
              {mainSelected === "DEFAULT" ? undefined : mainSelected ===
                "DEPARTMENT" ? (
                <>
                  <option value="Research">Research</option>
                  <option value="Headquarters">Headquarters</option>
                  <option value="Administration">Administration</option>
                </>
              ) : mainSelected === "SEX" ? (
                <>
                  <option value="F">F</option>
                  <option value="M">M</option>
                </>
              ) : mainSelected === "BDATE" ? (
                <>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </>
              ) : undefined}
            </select>
          ) : mainSelected === "SALARY" ? (
            <input
              type="text"
              className={classes.subInput}
              placeholder={"연봉을 입력 해 주세요."}
              ref={subSelectRefer}
              onChange={subSelectorHandler}
            />
          ) : mainSelected === "SUBORDINATE" ? (
            <input
              type="text"
              className={classes.subInput}
              placeholder={"직원의 이름을 입력 해주세요."}
              ref={subSelectRefer}
              onChange={subSelectorHandler}
            />
          ) : undefined}
        </div>
      </div>
      {children}
    </div>
  );
};

export default SelectBox;
