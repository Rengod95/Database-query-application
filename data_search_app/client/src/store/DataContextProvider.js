import React, { createContext, useEffect, useMemo, useState } from "react";
import { defaultTupleList } from "./DefaultTupleDataForm";
import APIHandler from "../api/APIHandler";

export const defaultDataState = {
  tupleDataSet: [],
  tupleRange: [],
  checkedEmp: [],
  totalCondition: {},
};

export const defaultDataDispatch = {
  tupleUpdateHandler: () => {},
  tupleDeleteHandler: () => {},
  tupleCreateHandler: () => {},
  setTupleDataSet: () => {},
  tupleRangeHandler: () => {},
  empCheckHandler: () => {},
  totalConditionHandler: () => {},
};

export const DataStateContext = createContext(defaultDataState);
export const DataDispatchContext = createContext(defaultDataDispatch);

export const DataContextProvider = (props) => {
  const [tupleDataSet, setTupleDataSet] = useState(defaultTupleList); // 검색 결과
  const [tupleRange, setTupleRange] = useState([
    "선택",
    "name",
    "ssn",
    "bdate",
    "address",
    "sex",
    "salary",
    "supervisor",
    "department",
  ]);
  const [checkedEmp, setCheckedEmp] = useState([new Set(), 0]);
  const [totalCondition, setTotalCondition] = useState({
    searchCondition: {},
    searchRange: [],
  });

  useEffect(() => {
    console.log(totalCondition);
  }, [totalCondition]);

  const tupleRangeHandler = (selectedRange) => {
    setTupleRange(() => [...selectedRange]);
  };

  const empCheckHandler = (selectedEmployees, totalSelected) => {
    console.log(selectedEmployees, totalSelected);
    setCheckedEmp(() => [selectedEmployees, totalSelected]);
  };

  const totalConditionHandler = (searchCondition, searchRange) => {
    const total = {
      searchCondition: searchCondition,
      searchRange: Array.from(searchRange),
    };
    setTotalCondition(() => total);
  };

  const tupleUpdateHandler = async (att, value) => {
    try {
      const res = await APIHandler.updateTupleAttribute(checkedEmp, att, value);
      setTupleDataSet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tupleDeleteHandler = async () => {
    try {
      const res = await APIHandler.deleteTuple(checkedEmp);
      setTupleDataSet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tupleCreateHandler = async (data) => {
    try {
      const res = await APIHandler.createTuple(data);
      setTupleDataSet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const state = {
    checkedEmp,
    tupleDataSet,
    tupleRange,
    totalCondition,
  };

  const dispatcher = useMemo(() => {
    return {
      tupleUpdateHandler,
      tupleDeleteHandler,
      tupleCreateHandler,
      setTupleDataSet,
      tupleRangeHandler,
      empCheckHandler,
      totalConditionHandler,
    };
  }, []);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatcher}>
        {props.children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};
