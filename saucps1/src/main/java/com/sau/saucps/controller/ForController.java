package com.sau.saucps.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/04/13
 */
@RestController
@RequestMapping("/for")
public class ForController {

    @RequestMapping("/login")
    public Object login(){
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}

