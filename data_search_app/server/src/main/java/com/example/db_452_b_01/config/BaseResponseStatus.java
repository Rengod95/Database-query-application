package com.example.db_452_b_01.config;


import lombok.Getter;

@Getter
public enum BaseResponseStatus {
    /**
     * 1000 : 요청 성공
     */
    SUCCESS(true, 1000, "요청에 성공하였습니다."),


    /**
     * 2000 : Request 오류
     */
    // Common
    REQUEST_ERROR(false, 2000, "입력값을 확인해주세요."),

    // [POST] /employee
        // no enter
    POST_EMPLOYEE_EMPTY_SSN(false, 2010, "ssn을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_FNAME(false, 2011, "firstName을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_LNAME(false, 2012, "lastName을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_MINIT(false, 2013, "minit을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_BDATE(false, 2014, "bdate을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_ADDRESS(false, 2015, "address을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_SEX(false, 2016, "sex을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_SALARY(false, 2017, "salary을 입력해주세요."),
    POST_EMPLOYEE_EMPTY_DNO(false, 2018, "dno을 입력해주세요."),

    //개체 무결성
    POST_EMPLOYEE_EXISTS_SSN(false,2019,"중복된 ssn입니다."),

    POST_EMPLOYEE_NOT_CHAR_MINIT(false, 2020, "minit 값이 char가 아닙니다."),

    // [Patch] /employee
    PATCH_EMPLOYEE_NOT_ALLOWED_SEX(false, 2021, "sex 값을 확인해주세요."),
    PATCH_EMPLOYEE_NOT_ALLOWED_SALARY(false, 2022, "salary 값을 확인해주세요."),
    // [Delete] /employee
    DELETE_EMPLOYEE_NOT_EXIST(false, 2023, "존재하지 않는 employee 입니다."),


    /**
     * 3000 : Response 오류
     */
    // Common
    RESPONSE_ERROR(false, 3000, "값을 불러오는데 실패하였습니다."),

    // [POST] /users
    DUPLICATED_EMAIL(false, 3013, "중복된 이메일입니다."),
    FAILED_TO_LOGIN(false,3014,"없는 아이디거나 비밀번호가 틀렸습니다."),



    /**
     * 4000 : Database, Server 오류
     */
    DATABASE_ERROR(false, 4000, "데이터베이스 연결에 실패하였습니다."),
    SERVER_ERROR(false, 4001, "서버와의 연결에 실패하였습니다."),

    //[PATCH] /users/{userIdx}
    MODIFY_FAIL_USERNAME(false,4014,"유저네임 수정 실패");


    // 5000 : 필요시 만들어서 쓰세요
    // 6000 : 필요시 만들어서 쓰세요


    private final boolean isSuccess;
    private final int code;
    private final String message;

    private BaseResponseStatus(boolean isSuccess, int code, String message) { //BaseResponseStatus 에서 각 해당하는 코드를 생성자로 맵핑
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}
