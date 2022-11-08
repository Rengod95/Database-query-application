import React, { useContext } from "react";
import { DataStateContext } from "../store/DataContextProvider";
import TupleList from "../sections/middle/components/TupleList";
import classes from "./TotalPage.module.scss";
import ConditionManager from "../sections/top/components/ContitionManager";
import Footer from "../sections/bottom/components/Footer";

const TotalPage = () => {
  console.log("리렌더링 토탈 페이지");

  return (
    <div className={classes.totalPageContainer}>
      <ConditionManager />
      <TupleList />
      <Footer />
    </div>
  );
};

export default TotalPage;
