import React, { useContext, useEffect, useRef, useState } from "react";
import { DataDispatchContext } from "../store/DataContextProvider";

const useSelectBox = (searchConditionHandler) => {
  const mainSelectRefer = useRef("DEFAULT");
  const subSelectRefer = useRef("DEFAULT");
  const [mainSelected, setMainSelected] = useState("DEFAULT");
  const [subSelected, setSubSelected] = useState("DEFAULT");

  useEffect(() => {
    searchConditionHandler(mainSelected, subSelected);
  }, [mainSelected, subSelected]);

  const mainSelectorHandler = () => {
    switch (mainSelectRefer.current.value) {
      case "DEFAULT": {
        return setMainSelected("DEFAULT");
      }
      case "DEPARTMENT": {
        setSubSelected("Research");
        return setMainSelected("DEPARTMENT");
      }
      case "SEX": {
        setSubSelected("F");
        return setMainSelected("SEX");
      }

      case "SALARY": {
        setSubSelected("0");
        return setMainSelected("SALARY");
      }

      case "BDATE": {
        setSubSelected("01");
        return setMainSelected("BDATE");
      }

      case "SUBORDINATE": {
        setSubSelected("");
        return setMainSelected("SUBORDINATE");
      }
    }
  };

  const subSelectorHandler = () => {
    setSubSelected(() => subSelectRefer.current.value);
  };

  return {
    mainSelectRefer,
    subSelectRefer,
    mainSelected,
    subSelected,
    mainSelectorHandler,
    subSelectorHandler,
  };
};

export default useSelectBox;
