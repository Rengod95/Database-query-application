import React from "react";
import axios from "axios";

const APIHandler = (function () {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  const getTuples = async (searchCondition, searchRange) => {
    const range = searchRange.map((val) => `&range=${val}`).join("");
    console.log(range);
    return await axios({
      url:
        `/employee?$mainCondition=${searchCondition.mainCondition}&subCondition=${searchCondition.subCondition}` +
        range,
      method: "GET",
    });
  };

  const updateTupleAttribute = async (emps, att, value) => {
    const emp = Array.from(emps[0]);
    return await axios({
      url: `/employee?att=${att}&value=${value}`,
      method: "PATCH",
      data: emp,
    });
  };

  const deleteTuple = async (emps) => {
    const emp = Array.from(emps[0]);
    return await axios({
      url: `/employee`,
      method: "DELETE",
      data: emp,
    });
  };

  const createTuple = async (data) => {
    console.log(data);
    return await axios({
      url: `/employee`,
      method: "POST",
      data: data,
    });
  };

  return {
    getTuples,
    updateTupleAttribute,
    deleteTuple,
    createTuple,
  };
})();

export default APIHandler;
