package com.example.db_452_b_01.service;


import com.example.db_452_b_01.config.BaseException;
import com.example.db_452_b_01.config.BaseResponseStatus;
import com.example.db_452_b_01.dao.EmployeeDao;
import com.example.db_452_b_01.model.EmployeeReq;
import com.example.db_452_b_01.model.EmployeeRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.db_452_b_01.config.BaseResponseStatus.*;

@Service
public class EmployeeService {
    private EmployeeDao employeeDao;

    @Autowired
    public EmployeeService(EmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }

    // employee 검색
    public List<EmployeeRes> showEmployee(String main, String sub) {

        List<EmployeeRes> employeeReses = employeeDao.showEmployee(main, sub);
        return employeeReses;
    }

    // employee 추가
    public void addEmployee(EmployeeReq employeeReq) throws BaseException {
        // ssn 중복 값인지 check
        if(this.checkSsn(employeeReq.getSsn())){
            throw new BaseException(POST_EMPLOYEE_EXISTS_SSN);
        }

        try {
            employeeDao.addEmployee(employeeReq);
        }catch (BaseException e){
            throw new BaseException(DATABASE_ERROR);
        }

    }

    // employee 정보 수정
    public void patchEmployee(List<EmployeeRes> change, String att, String value) throws BaseException{
        try {
        employeeDao.updateEmployee(change, att, value);
        }catch (Exception e){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // employee 삭제
    public void deleteEmployee(List<EmployeeReq> target) throws BaseException{
        try {
            employeeDao.deleteEmployee(target);
        }catch (Exception e){
            throw new BaseException(DATABASE_ERROR);
        }

    }

    //ssn check
    public boolean checkSsn(String ssn) throws BaseException{
        try{
            return employeeDao.checkSsn(ssn);
        }catch (Exception e){
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
