package com.example.db_452_b_01.controller;

import com.example.db_452_b_01.config.BaseException;
import com.example.db_452_b_01.config.BaseResponse;
import com.example.db_452_b_01.model.EmployeeRes;
import com.example.db_452_b_01.service.DepartmentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.example.db_452_b_01.config.BaseResponseStatus.DATABASE_ERROR;

@CrossOrigin(origins = "http://localhost:3000" , allowCredentials= "true")
@RestController
public class DepartmentController {
    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }
    @PatchMapping("/department")///department?dname
    public BaseResponse<String> salaryPatch(@RequestParam(value = "dname") String dname, @RequestParam(value = "value") String value) throws BaseException {

        try {
            departmentService.salaryPatch(dname, value);
            String result = "salary 일괄 수정 완료";
            return new BaseResponse<>(result);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());

        }
    }

}
