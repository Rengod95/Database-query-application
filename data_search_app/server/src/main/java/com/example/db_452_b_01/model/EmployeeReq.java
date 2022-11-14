package com.example.db_452_b_01.model;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeReq {

    private String firstName = null;
    private String middleInit= null;
    private String lastName = null;
    private String ssn = null;
    private Date birthDate = null;
    private String address = null;
    private String sex = null;
    private double salary = -1;

    //EmployeeRes와의 차이
    private String superSsn;
    private String dno;

}
