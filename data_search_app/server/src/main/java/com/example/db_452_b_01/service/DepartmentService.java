package com.example.db_452_b_01.service;


import com.example.db_452_b_01.dao.DepartmentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {
    private DepartmentDao departmentDao;

    @Autowired
    public DepartmentService(DepartmentDao departmentDao) {
        this.departmentDao = departmentDao;
    }
}
