import React, { useContext, useEffect, useState } from "react";

import classes from "./styles/ConditionManager.module.scss";
import SelectBox from "./SelectBox";
import RangeController from "./RangeController";
import LookingUpButton from "./LookingUpButton";
import TupleCreateForm from "./TupleCreateForm";
import { DataDispatchContext } from "../../../store/DataContextProvider";

const ConditionManager = () => {
  const [searchCondition, setSearchCondition] = useState({
    mainCondition: "",
    subCondition: "",
  });
  const [searchRange, setSearchRange] = useState(new Set([]));
  const dispatcher = useContext(DataDispatchContext);

  useEffect(() => {
    console.log(`SearchRange: ${[...searchRange]}`);
    console.log(
      `SearchCondition: ${searchCondition.mainCondition} ${searchCondition.subCondition}`
    );
  }, [searchRange, searchCondition]);

  const searchRangeHandler = (att) => {
    setSearchRange((currentSet) => {
      if (currentSet.has(att)) {
        const deleted = [...currentSet].filter((val) => val !== att);
        return new Set(deleted);
      } else {
        return new Set([...currentSet, att]);
      }
    });
  };

  const searchConditionHandler = (mainCondition, subCondition) => {
    // console.log(`메인 조건 : ${mainCondition} 서브 조건: ${subCondition} `);
    setSearchCondition(() => {
      return { mainCondition: mainCondition.toLowerCase(), subCondition: subCondition.toLowerCase() };
    });
  };

  return (
    <div className={classes.ConditionManagerContainer}>
      <SelectBox searchConditionHandler={searchConditionHandler}>
        <LookingUpButton range={searchRange} condition={searchCondition} />
      </SelectBox>
      <TupleCreateForm />
      <RangeController searchRangeHandler={searchRangeHandler} />
    </div>
  );
};

export default ConditionManager;
