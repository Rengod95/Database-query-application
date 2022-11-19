package com.example.db_452_b_01.dao;


import com.example.db_452_b_01.model.DependentReq;
import com.example.db_452_b_01.model.DependentRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DependentDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public DependentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<DependentRes> showDependent(DependentReq dependentReqs) {
        String selectDependentQuery = "SELECT * FROM dependent WHERE Essn=\""+dependentReqs.getSsn()+"\"";

        return jdbcTemplate.query(selectDependentQuery,
                (rs, rowNum) -> new DependentRes(
                        rs.getString("Essn"),
                        rs.getString("Dependent_name"),
                        rs.getString("Sex"),
                        rs.getString("Bdate"),
                        rs.getString("Relationship")
                ));
    }
}
