package com.example.db_452_b_01.controller;

import com.example.db_452_b_01.model.DependentReq;
import com.example.db_452_b_01.model.DependentRes;
import com.example.db_452_b_01.service.DependentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000" , allowCredentials= "true")
@RestController
public class DependentController {
    private final DependentService dependentService;

    @Autowired
    public DependentController(DependentService dependentProvider) {
        this.dependentService = dependentProvider;
    }

    @PostMapping("/dependent")// /dependent
    public List<DependentRes> showDependent(@RequestBody List<DependentReq> dependentReqs) {
//    public void showDependent() {
        System.out.println(dependentReqs);
        List<DependentRes> maps = new ArrayList<>();
        for(DependentReq dependentReq: dependentReqs) {
            List<DependentRes> result = dependentService.showDependent(dependentReq);
            for(DependentRes dependentReses: result) {
                maps.add(dependentReses);
            }
        }
        System.out.println(maps);
        return maps;

    }
}
