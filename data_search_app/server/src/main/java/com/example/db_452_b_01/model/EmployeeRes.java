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
public class EmployeeRes {

    private String firstName;
    private String middleInit;
    private String lastName;
    private String ssn;
    private String bdate;
    private String address;
    private String sex;
    private double salary;

    //EmployeeRes와의 차이
    private String super_fname;
    private String super_lname;
    private String super_minit;
    private String department;
}
