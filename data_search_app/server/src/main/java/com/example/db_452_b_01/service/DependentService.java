package com.example.db_452_b_01.service;


import com.example.db_452_b_01.dao.DependentDao;
import com.example.db_452_b_01.model.DependentReq;
import com.example.db_452_b_01.model.DependentRes;
import com.example.db_452_b_01.model.EmployeeRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class DependentService {
    private DependentDao dependentDao;

    @Autowired
    public DependentService(DependentDao dependentDao) {
        this.dependentDao = dependentDao;
    }

    public List<DependentRes> showDependent(DependentReq dependentReqs) {
        List<DependentRes> dependentRes = dependentDao.showDependent(dependentReqs);

        return dependentRes;
    }
}
