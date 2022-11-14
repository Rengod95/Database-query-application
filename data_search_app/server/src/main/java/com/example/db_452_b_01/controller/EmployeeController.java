package com.example.db_452_b_01.controller;

import com.example.db_452_b_01.config.BaseException;
import com.example.db_452_b_01.config.BaseResponse;
import com.example.db_452_b_01.model.EmployeeReq;
import com.example.db_452_b_01.model.EmployeeRes;
import com.example.db_452_b_01.service.EmployeeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.example.db_452_b_01.config.BaseResponseStatus.*;


@CrossOrigin(origins = "http://localhost:3000" , allowCredentials= "true")
@RestController
public class EmployeeController {
    private final EmployeeService employeeService;
    private final ObjectMapper objectMapper= new ObjectMapper();

    @Autowired
    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    //모든 employee 검색
    @GetMapping("/employee")
    public List<Map> getEmployees(@RequestParam(value = "mainCondition") String main, @RequestParam(value = "subCondition") String sub, @RequestParam(value = "range") String[] check) throws JsonProcessingException {

        List<EmployeeRes> employeeReses = employeeService.showEmployee(main, sub);
        List<Map> maps = new ArrayList<>();
        filtering(check, employeeReses, maps);

        return maps;

    }

    //employee 등록
    @PostMapping("/employee")
    public BaseResponse<String> postEmployees(@RequestBody EmployeeReq employeeReq){
        System.out.println("sex:"+ employeeReq.getSex());

        //Ssn empty check
        if(employeeReq.getSsn() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_SSN);
        }
        //Fname empty check
        if(employeeReq.getFirstName() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_FNAME);
        }
        //Lname empty check
        if(employeeReq.getLastName() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_LNAME);
        }
        //Minit empty check
        if(employeeReq.getMiddleInit() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_MINIT);
        }
        //Bdate empty check
        if(employeeReq.getBirthDate() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_BDATE);
        }
        //Address empty check
        if(employeeReq.getAddress() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_ADDRESS);
        }
        //Salary empty check
        if(employeeReq.getSalary() == -1){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_SALARY);
        }
        //Dno empty check
        if(employeeReq.getDno() == null){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_DNO);
        }
        //Minit isChar check
        if(employeeReq.getMiddleInit().length() != 1){
            return new BaseResponse<>(POST_EMPLOYEE_NOT_CHAR_MINIT);
        }

        try {
            employeeService.addEmployee(employeeReq);

            String result = "employee 추가 완료";
            return new BaseResponse<>(result);
        }catch (BaseException e){
            return new BaseResponse<>((e.getStatus()));
        }

    }

    //employee 정보 변경
    //employeeReq 의 Ssn 과 일치하는 employee 의 att 값을 value 로 변경
    @PatchMapping("/employee")
    public BaseResponse<String> patchEmployees(@RequestBody List<EmployeeRes> employeeReses, @RequestParam(value = "att") String att, @RequestParam(value = "value") String value){

        //sex 변경 시 모두 대문자로 변경
        if(att.equals("sex")){
            value = value.toUpperCase();
            //sex 값이 M or F가 아닐때 처리
            if(!(value.equals("M") || value.equals("F"))){
                return new BaseResponse<>(PATCH_EMPLOYEE_NOT_ALLOWED_SEX);
            }
        }

        //salary 변경 시 값이 숫자 X or Null or 음수 값 처리
        if(att.equals("salary") && !(value != null && value.matches("[-+]?\\d*\\.?\\d+") && Double.parseDouble(value) >= 0 )){
            return new BaseResponse<>(PATCH_EMPLOYEE_NOT_ALLOWED_SALARY);
        }
        //address 변경 시 Null 값 처리
        if(att.equals("address") && value == ""){
            return new BaseResponse<>(POST_EMPLOYEE_EMPTY_ADDRESS);
        }


        try {
            employeeService.patchEmployee(employeeReses, att, value);

            String result = "employee 수정 완료";
            return new BaseResponse<>(result);
        }catch (BaseException e){
            return new BaseResponse<>(e.getStatus());
        }
    }

    //ssn 기준으로 employee 삭제
    @DeleteMapping("/employee")
    public BaseResponse<String> deleteEmployees(@RequestBody List<EmployeeReq> target){
        try {
            employeeService.deleteEmployee(target);
            String result = "employee 삭제 완료";
            return new BaseResponse<>(result);
        }catch (BaseException e){
            return new BaseResponse<>((e.getStatus()));
        }
    }

    // 검색 시 체크박스 필터링
    private void filtering(String[] check, List<EmployeeRes> employeeReses, List<Map> maps) {
        String []list = {"firstName", "middleInit", "lastName", "ssn", "birthDate", "address", "sex", "salary", "super_fname", "super_minit","super_lname", "department"};
        List<String> nList = new ArrayList<>(Arrays.asList(list));
        List<String> nCheck = new ArrayList<>(Arrays.asList(check));

        for(String range: list) {
            if (nCheck.contains(range)) {
                nList.remove(range);
            }
        }
        if(nCheck.contains("name")){
            nList.remove("firstName");
            nList.remove("lastName");
            nList.remove("middleInit");
        }
        if(nCheck.contains("supervisor")){
            nList.remove("super_fname");
            nList.remove("super_lname");
            nList.remove("super_minit");
        }

        for(EmployeeRes res: employeeReses){
            Map result = objectMapper.convertValue(res, Map.class);
            for(String range: nList){
                result.remove(range);
            }
            maps.add(result);
            if(result.containsKey("firstName")&&result.containsKey("lastName")&&result.containsKey("middleInit")){

                result.put("name",(String)result.get("firstName") +" "+ (String)result.get("middleInit") +" "+ (String)result.get("lastName"));
                result.remove("firstName");
                result.remove("lastName");
                result.remove("middleInit");
            }


            if(result.containsKey("super_fname")&& result.containsKey("super_lname")&& result.containsKey("super_minit")){

                result.put("supervisor",(String)result.get("super_fname") +" "+ (String)result.get("super_minit")+" "+ (String)result.get("super_lname"));
                if(result.get("super_fname")==null && result.get("super_fname")==null && result.get("super_minit")==null){
                    result.put("supervisor"," ");
                }
                result.remove("super_fname");
                result.remove("super_lname");
                result.remove("super_minit");
            }

        }
    }

}

