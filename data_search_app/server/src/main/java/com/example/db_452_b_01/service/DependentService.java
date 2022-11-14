package com.example.db_452_b_01.service;


import com.example.db_452_b_01.dao.DependentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DependentService {
    private DependentDao dependentDao;

    @Autowired
    public DependentService(DependentDao dependentDao) {
        this.dependentDao = dependentDao;
    }
}
