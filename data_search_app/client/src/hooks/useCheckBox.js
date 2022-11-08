import React, { useContext, useEffect, useState } from "react";
import { DataDispatchContext } from "../store/DataContextProvider";

const useCheckBox = () => {
  const [selectedEmployees, setSelectedEmployees] = useState(new Set()); // 선택된 직원
  const [totalSelected, setTotalSelected] = useState(0); // 직원 총 수
  const dispatcher = useContext(DataDispatchContext);

  const tupleSelectCanceler = (emp) => {
    const currentRange = [...selectedEmployees];
    console.log(selectedEmployees);
    const deleted = currentRange.filter((_emp) => _emp.SSN !== emp.SSN);
    const count = deleted.length;
    setTotalSelected(() => count);
    setSelectedEmployees(() => new Set(deleted));
  };

  const tupleSelector = (emp) => {
    setTotalSelected((prev) => prev + 1);
    setSelectedEmployees((current) => current.add(emp));
  };

  useEffect(() => {
    dispatcher.empCheckHandler(selectedEmployees, totalSelected);
  }, [selectedEmployees, totalSelected]);

  return {
    tupleSelector,
    tupleSelectCanceler,
  };
};

export default useCheckBox;
