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
public class Dependent {
    private String Essn;
    private String Dependent_name;
    private char Sex;
    private Date Bdate;
    private String Relationship;
}
