//package com.sau.saucps.utils;
//
//import cn.sau.sauoh.config.MailConfig;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Component;
//import org.thymeleaf.context.Context;
//import org.thymeleaf.spring5.SpringTemplateEngine;
//
//import javax.mail.internet.MimeMessage;
//
///**
// *
// */
//@Component
//@Slf4j
//public class EmailUtils {
//
//    public static final String EMAIL_PATTERN = "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?";
//
//    private JavaMailSender mailSender;
//    private SpringTemplateEngine thymeleaf;
//
//    /**
//     * 检查邮箱地址是否符合格式
//     */
//    public static boolean checkAddress(String address) {
//        return address.matches(EMAIL_PATTERN);
//    }
//
//    @Autowired
//    public void setMailSender(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//    @Autowired
//    public void setThymeleaf(SpringTemplateEngine thymeleaf) {
//        this.thymeleaf = thymeleaf;
//    }
//
//    /**
//     * 发送邮件（异步执行）
//     *
//     * @param to      收件人邮箱地址
//     * @param subject 邮箱主题
//     * @param temp    邮件使用的模板名
//     * @param context 邮箱内容，应使用已装填的 context
//     */
//    @Async
//    public void sendEmail(String to, String subject, String temp, Context context) {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper;
//        try {
//            helper = new MimeMessageHelper(message, true);
//            helper.setFrom(MailConfig.getSenderAddress());
//            helper.setTo(to);
//            helper.setSubject(subject);
//            String emailText = thymeleaf.process("emailTemp/" + temp, context);
//            helper.setText(emailText, true);
//            mailSender.send(message);
//        } catch (Exception e) {
//            log.error("邮件发送错误！" + e.getMessage());
//        }
//    }
//}
