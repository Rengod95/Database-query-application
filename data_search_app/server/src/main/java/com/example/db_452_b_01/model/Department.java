package com.example.db_452_b_01.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Department {
    private String Dname;
    private int Dnumber;
    private String Mgr_ssn;
    private Date Mgr_start_date;

}
