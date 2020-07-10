package com.sau.saucps.security;

import com.sau.saucps.entity.vm.UserVM;
import com.sau.saucps.mapper.vm.UserVMMapper;
import com.sau.saucps.security.entity.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/26
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserVMMapper userVMMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        UserVM user = userVMMapper.selectUserVMByUsername(s);
        if(user == null){
            throw new UsernameNotFoundException("未找到用户");
        }

        List<UserVM> userVMS = new ArrayList<>();
        userVMS.add(user);

         return new MyUserDetails(user.getUsername(),passwordEncoder.encode(user.getPassword())
                 ,userVMS,user.getName(),user.getBranchId(),user.getGeneralbranceId());

    }
}
