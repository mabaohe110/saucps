package com.sau.saucps.utils;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 异常处理器 、在响应报文中添加错误信息
 */
@Component
@RestControllerAdvice
public class RRExceptionHandler implements HandlerExceptionResolver {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {

        try (PrintWriter writer = response.getWriter()) {
            response.setContentType("application/json;charset=utf-8");
            response.setCharacterEncoding("utf-8");

            int status = 500;
            String errorName = "未知错误，请联系管理员";
            String message = "未知错误，请联系管理员";
            //一些自定义异常
            if (ex instanceof RRException) {
                status = ((RRException) ex).getCode();
                errorName = "RRException";
                message = ((RRException) ex).getMsg();
            }
            //各种唯一值约束限制和数据库完整性约束
            else if (ex instanceof DataIntegrityViolationException) {
                status = 400;
                errorName = "存储过程错误";
                message = Objects.requireNonNull(((DataIntegrityViolationException) ex).getRootCause()).getLocalizedMessage();
            }

            R r = new R();
            r.put("timestamp", (new SimpleDateFormat(DateUtils.DATE_TIME_PATTERN)).format(new Date()));
            r.put("status", status);
            r.put("error", errorName);
            r.put("message", message);
            response.sendError(status);
            String json = JSON.toJSONString(r);
            writer.print(json);
            writer.flush();

            //记录异常日志
            logger.error(ex.getMessage(), ex);
        } catch (Exception e) {
            logger.error("RRExceptionHandler 异常处理失败", e);
        }
        return new ModelAndView();
    }

    //表单绑定错误
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map bindException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        List<String> errors = new ArrayList<>();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            errors.add(fieldError.getField() + ":" + fieldError.getDefaultMessage());
        }
        Map<String, Object> responseBody = new LinkedHashMap<>(5);
        responseBody.put("timestamp", (new SimpleDateFormat(DateUtils.DATE_TIME_PATTERN)).format(new Date()));
        responseBody.put("status", 400);
        responseBody.put("error", "表单绑定错误");
        responseBody.put("msg", errors);
        return responseBody;
    }

    private String handlDataIntegrityViolationException(DataIntegrityViolationException e) {
        return Objects.requireNonNull(e.getRootCause()).getLocalizedMessage();
    }
}
