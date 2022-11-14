package com.example.db_452_b_01.controller;

import com.example.db_452_b_01.service.DependentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class DependentController {
    private final DependentService dependentService;

    @Autowired
    public DependentController(DependentService dependentProvider) {
        this.dependentService = dependentProvider;
    }
}
