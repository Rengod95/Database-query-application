import React from "react";
import classes from "./styles/Footer.module.scss";
import SelectTupleTracker from "./SelectTupleTracker";
import TupleUpdater from "./TupleUpdater";
import TupleDeleter from "./TupleDeleter";

const Footer = () => {
  return (
    <div className={classes.Container}>
      <SelectTupleTracker />
      <TupleUpdater />
      <TupleDeleter />
    </div>
  );
};

export default Footer;
