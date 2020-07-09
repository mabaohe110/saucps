package com.sau.saucps.utils;

import javax.servlet.http.HttpServletResponse;

/**
 * 自定义异常
 */
public class RRException extends RuntimeException {
    /**
     * http 响应码表（错误相关）
     * 40x
     * 400   （错误请求）服务器不理解请求的语法。
     * 401   （未授权）请求要求身份验证。对于需要登录的网页，服务器可能返回此响应。
     * 403   （禁止）服务器拒绝请求。
     * 404   （未找到）服务器找不到请求的网页。
     */
    private static final long serialVersionUID = 1L;

    private String msg;
    private int code;

    public RRException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public static RRException badRequest(String msg) {
        return new RRException(msg, HttpServletResponse.SC_BAD_REQUEST);
    }

    public static RRException forbinden(String msg) {
        return new RRException(msg, HttpServletResponse.SC_FORBIDDEN);
    }

    public static RRException notFound(String msg) {
        return new RRException(msg, HttpServletResponse.SC_NOT_FOUND);
    }

    public static RRException serverError(String msg) {
        return new RRException(msg, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }

    public static RRException serverError() {
        return new RRException("服务器错误，请联系管理员", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
