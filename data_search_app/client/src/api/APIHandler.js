import axios from "axios";

const APIHandler = (function () {
  axios.defaults.baseURL = "http://localhost:8080";// 3001->8080
  axios.defaults.withCredentials = true;

  const getTuples = async (searchCondition, searchRange) => {
    const range = searchRange.map((val) => `&range=${val}`).join("");
    if(searchCondition.mainCondition === 'default') searchCondition.subCondition= 'default'
    console.log(range);
    return await axios({
      url://$mainCondition -> mainConditon
        `/employee?mainCondition=${searchCondition.mainCondition}&subCondition=${searchCondition.subCondition}` +
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

  const updateByDepartment= async (department,value)=>{

    return await axios({
      url: `/department?dname=${department}&value=${value}`,
      method:"PATCH",
    })
  }

  const getDependent = async (emps)=>{
    const emp = Array.from(emps[0]);
    return await axios({
      url: '/dependent',
      method:"GET",
      data:emp
    })
  }

  return {
    getTuples,
    updateTupleAttribute,
    deleteTuple,
    createTuple,
    getDependent,
    updateByDepartment
  };
})();

export default APIHandler;
