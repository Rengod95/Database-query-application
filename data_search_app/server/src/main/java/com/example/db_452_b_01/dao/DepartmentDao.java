package com.example.db_452_b_01.dao;


import com.example.db_452_b_01.model.EmployeeRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.db_452_b_01.dao.EmployeeDao.getEmployeeRes;

@Service
public class DepartmentDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public DepartmentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void salaryPatch(String dname, String value) {
        String salaryPatchQuery = "UPDATE employee, department SET salary=?  WHERE Dno=Dnumber AND Dname=\""+dname+"\"";
        System.out.println("dname = " + dname + ", value = " + value);
        System.out.println(salaryPatchQuery);
        Object[] salaryPatchParams = new Object[]{
                value
        };
        this.jdbcTemplate.update(salaryPatchQuery,salaryPatchParams);
    }




}
