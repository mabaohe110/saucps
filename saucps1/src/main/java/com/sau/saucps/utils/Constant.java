package com.sau.saucps.utils;

/**
 * 常量
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月15日 下午1:23:52
 */
public class Constant {

    public static final String SORTOF_ASC = "ASC";
    public static final String SORTOF_DESC = "DESC";

    public static final Integer ROLE_CODE_PROVINCE_ADMIN = 1;
    public static final Integer ROLE_CODE_CITY_ADMIN = 2;
    public static final Integer ROLE_CODE_DOCTOR = 3;
    public static final Integer ROLE_CODE_PATIENT = 4;

    public static final Integer DOCTOR_CHECK_PASSED = 1;
    public static final Integer DOCTOR_NON_CHECK = 0;

    public static final String ERROR_MSG_ID_NOT_EXIST = "Id不存在";
    public static final String ERROR_MSG_ID_NOT_NEED = "当前操作不应指明Id";
    public static final String ERROR_MSG_ID_NEED = "当前操作必须指明Id";
    public static final String ERROR_MSG_USERID_CAN_NOT_UPDATE = "userId字段不能修改";
}
