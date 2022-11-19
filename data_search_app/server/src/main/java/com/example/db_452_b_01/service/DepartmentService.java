package com.example.db_452_b_01.service;


import com.example.db_452_b_01.config.BaseException;
import com.example.db_452_b_01.dao.DepartmentDao;
import com.example.db_452_b_01.model.EmployeeRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.db_452_b_01.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class DepartmentService {
    private DepartmentDao departmentDao;

    @Autowired
    public DepartmentService(DepartmentDao departmentDao) {
        this.departmentDao = departmentDao;
    }

    public void salaryPatch(String dname, String value) throws BaseException {

        try {
            departmentDao.salaryPatch(dname, value);
        } catch (Exception e) {
            throw new BaseException(DATABASE_ERROR);
        }

    }

}
