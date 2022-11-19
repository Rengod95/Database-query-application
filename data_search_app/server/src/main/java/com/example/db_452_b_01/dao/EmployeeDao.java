package com.example.db_452_b_01.dao;

import com.example.db_452_b_01.config.BaseException;
import com.example.db_452_b_01.model.EmployeeReq;
import com.example.db_452_b_01.model.EmployeeRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EmployeeDao {
    private static JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // employee 검색
    public List<EmployeeRes> showEmployee(String main, String sub) {
        // default query
        String selectEmployeeQuery = "SELECT * FROM employee e1 LEFT JOIN employee e2 ON e1.Super_ssn = e2.Ssn, department  WHERE e1.Dno=Dnumber ";

        if(main.equals("sex")) { //sex 기준으로 검색 시
            selectEmployeeQuery += "AND e1."+main+"=\""+sub +"\"";
        }else if(main.equals("salary")){ //salary 기준으로 검색 시
            selectEmployeeQuery += "AND e1."+main+">=\""+sub +"\"";
        }else if(main.equals("bdate")){//bdate 기준으로 검색 시
            selectEmployeeQuery += "AND e1."+main+" like \"____-"+sub +"-__\"";
        }else if(main.equals("subordinate")){//subordinate 기준으로 검색 시
            String[] name = sub.split(" ");
            selectEmployeeQuery += "AND e2.Fname=\""+name[0] +"\" AND e2.Minit=\""+name[1] +"\" And e2.Lname=\""+name[2] +"\"";
        }else if(main.equals("department")){//subordinate 기준으로 검색 시
            String[] name = sub.split(" ");
            selectEmployeeQuery += "AND Dname=\""+sub+"\"";
        }


            System.out.println(selectEmployeeQuery);
        return getEmployeeRes(selectEmployeeQuery, this.jdbcTemplate);
    }

    // employee 추가
    public void addEmployee(EmployeeReq employeeReq) throws BaseException {

        String createEmployeeQuery = "insert into employee (Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_Ssn, Dno, created, modified) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
        Object[] creatEmployeeParams = new Object[]{
                employeeReq.getFirstName(), employeeReq.getMiddleInit(), employeeReq.getLastName(), employeeReq.getSsn(),
                employeeReq.getBirthDate(), employeeReq.getAddress(), employeeReq.getSex(), employeeReq.getSalary(),
                employeeReq.getSuperSsn(), employeeReq.getDno()
        };

        this.jdbcTemplate.update(createEmployeeQuery, creatEmployeeParams);
    }

    // employee 정보 변경
    public void updateEmployee(List<EmployeeRes> change, String att, String value){

        for(EmployeeRes employees : change) {
            String updateEmployeeQuery = "UPDATE employee SET " + att + "=? WHERE Ssn=?";
            Object[] updateEmployeeParams = new Object[]{
                    value, employees.getSsn()
            };
            System.out.println(updateEmployeeQuery);
            this.jdbcTemplate.update(updateEmployeeQuery, updateEmployeeParams);

            // employee 정보 수정 시간 변경
            updateEmployeeQuery = "UPDATE employee SET modified=NOW() WHERE Ssn=?";
            updateEmployeeParams = new Object[]{
                    employees.getSsn()
            };
            this.jdbcTemplate.update(updateEmployeeQuery, updateEmployeeParams);
        }
    }

    //employee 삭제
    public void deleteEmployee(List<EmployeeReq> target){
        for(EmployeeReq employees : target) {
            String updateEmployeeQuery = "DELETE FROM employee WHERE Ssn=?";
            Object[] updateEmployeeParams = new Object[]{
                    employees.getSsn()
            };

            this.jdbcTemplate.update(updateEmployeeQuery, updateEmployeeParams);
        }
    }

    // ssn check
        // 중복값이 있으면 true, 아니면 false
    public boolean checkSsn(String ssn) {
        String checkSsnQuery = "SELECT EXISTS(SELECT ssn FROM employee WHERE ssn = ?)";
        String checkSsnParams = ssn;
        return this.jdbcTemplate.queryForObject(checkSsnQuery, Boolean.class, checkSsnParams);
    }

    static List<EmployeeRes> getEmployeeRes(String selectEmployeeQuery, JdbcTemplate jdbcTemplate) {
        return jdbcTemplate.query(selectEmployeeQuery,
                (rs, rowNum) -> new EmployeeRes(
                        rs.getString("e1.Fname"),
                        rs.getString("e1.Minit"),
                        rs.getString("e1.Lname"),
                        rs.getString("e1.Ssn"),
                        rs.getString("e1.Bdate"),
                        rs.getString("e1.Address"),
                        rs.getString("e1.Sex"),
                        rs.getInt("e1.Salary"),
                        rs.getString("e2.Fname"),
                        rs.getString("e2.Lname"),
                        rs.getString("e2.Minit"),
                        rs.getString("Dname")
                ));
    }
}
