package com.sau.saucps.utils;

import javax.servlet.http.HttpServletResponse;
import java.util.LinkedHashMap;

/**
 * 针对返回数的操作类，用于设置http响应码
 */
public class R extends LinkedHashMap<String, Object> {
    /*
     * http 响应码表
     * 20X
     * 200   （成功）  服务器已成功处理了请求。
     * 201   （已创建）  请求成功并且服务器创建了新的资源。
     * 204   （无内容）  服务器成功处理了请求，但没有返回任何内容。
     */

    private static final long serialVersionUID = 1L;

    /**
     * 默认的响应码是 200，所以此时不用专门设置响应码
     */
    public static R ok() {
        return make();
    }

    public static R created(HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_CREATED);
        return make();
    }

    /**
     * 该类其他函数制造的响应体应该按实际情况添加响应体，这个函数不必
     */
    public static R noContent(HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return make();
    }

    public static R make() {
        return new R();
    }

    /**
     * 保留一个全参构造函数用于以上函数未涉及的情况，使用这个函数时应在controller中专门设置响应码
     */
    public static R make(int code, String msg) {
        R r = new R();
        r.put("code", code);
        r.put("msg", msg);
        return r;
    }

    @Override
    public R put(String key, Object value) {
        super.put(key, value);
        return this;
    }
}
