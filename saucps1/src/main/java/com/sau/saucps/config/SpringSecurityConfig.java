package com.sau.saucps.config;

import com.sau.saucps.security.UserDetailsServiceImpl;
import com.sau.saucps.security.component.MyAuthenticationFailure;
import com.sau.saucps.security.component.MyAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/26
 */
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig{

    @Configuration
    @Order(1)
    public static class AdminLoginConfig extends WebSecurityConfigurerAdapter{

        @Autowired
        private UserDetailsServiceImpl userDetailsServiceImpl;

        @Autowired
        private MyAuthenticationSuccessHandler myAuthenticationSuccessHandler;

        @Autowired
        private MyAuthenticationFailure myAuthenticationFailure;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .antMatcher("/user/**")
                    .authorizeRequests()
                    .antMatchers("/user/login.html","/js/**","/css/**","/images/**").permitAll()
                    .antMatchers("/user/super_admin/**").hasRole("超级管理员")
                    .antMatchers("/user/branch_head/**").hasRole("支部书记")
                    .antMatchers("/user/general_branch_head/**").hasRole("党总支书记")
                    .antMatchers("/user/organization_head/**").hasRole("党委组织部长")
                    .anyRequest().authenticated()
                    .and()
                    .formLogin().loginPage("/user/login.html")
                    .loginProcessingUrl("/user/login")
                    .successHandler(myAuthenticationSuccessHandler)
                    .failureHandler(myAuthenticationFailure)
                    .and()
                    .csrf().disable();

            //关闭security服务
//        http.authorizeRequests()
//                .anyRequest().permitAll()
//                .and()
//                .formLogin().loginPage("/login.html")
//                .loginProcessingUrl("/user/login")
//                .defaultSuccessUrl("/index.html").permitAll()
//                .successHandler(myAuthenticationSuccessHandler)
//                .failureHandler(myAuthenticationFailure)
//                .and()
//                .csrf().disable();
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
        }

    }

    @Configuration
    @Order(2)
    public static class ForLoginConfig extends WebSecurityConfigurerAdapter{

        @Autowired
        private UserDetailsServiceImpl userDetailsServiceImpl;

        @Autowired
        private MyAuthenticationSuccessHandler myAuthenticationSuccessHandler;

        @Autowired
        private MyAuthenticationFailure myAuthenticationFailure;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .antMatcher("/for/**")
                    .authorizeRequests()
                    .antMatchers("/for/login.html","/js/**","/css/**","/images/**").permitAll()
                    .antMatchers("/for/super_admin/**").hasRole("超级管理员")
                    .antMatchers("/for/branch_head/**").hasRole("支部书记")
                    .antMatchers("/for/general_branch_head/**").hasRole("党总支书记")
                    .antMatchers("/for/organization_head/**").hasRole("党委组织部长")
                    .anyRequest().authenticated()
                    .and()
                    .formLogin().loginPage("/for/login.html")
                    .loginProcessingUrl("/for/login")
                    .successHandler(myAuthenticationSuccessHandler)
                    .failureHandler(myAuthenticationFailure)
                    .and()
                    .csrf().disable();

            //关闭security服务
//        http.authorizeRequests()
//                .anyRequest().permitAll()
//                .and()
//                .formLogin().loginPage("/login.html")
//                .loginProcessingUrl("/user/login")
//                .defaultSuccessUrl("/index.html").permitAll()
//                .successHandler(myAuthenticationSuccessHandler)
//                .failureHandler(myAuthenticationFailure)
//                .and()
//                .csrf().disable();
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
        }

    }


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
