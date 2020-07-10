package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.toolkit.SqlHelper;
import com.sau.saucps.entity.Role;
import com.sau.saucps.entity.User;
import com.sau.saucps.entity.UserRole;
import com.sau.saucps.entity.vm.UserVM;
import com.sau.saucps.mapper.RoleMapper;
import com.sau.saucps.mapper.UserMapper;
import com.sau.saucps.mapper.UserRoleMapper;
import com.sau.saucps.mapper.vm.UserVMMapper;
import com.sau.saucps.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {


    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public User userCheck(User user) {
        if(user.getBirthday().equals("")){
            user.setBirthday(null);
        }
        if(user.getPartyDate().equals("")){
            user.setPartyDate(null);
        }
        if(user.getPhone().equals("")){
            user.setPhone(null);
        }
        if(user.getAddress().equals("")){
            user.setAddress(null);
        }
        return user;
    }

    @Override
    public UserVM userVMCheck(UserVM user) {
        if(user.getBirthday()!=null && user.getBirthday().equals("")){
            user.setBirthday(null);
        }
        if(user.getPartyDate()!=null && user.getPartyDate().equals("")){
            user.setPartyDate(null);
        }
        if(user.getPhone()!=null && user.getPhone().equals("")){
            user.setPhone(null);
        }
        if(user.getAddress()!=null && user.getAddress().equals("")){
            user.setAddress(null);
        }
        return user;
    }

    @Override
    public boolean saveUserVM(UserVM userVM){
        User user = new User();
        user.setUsername(userVM.getUsername());
        user.setPassword(userVM.getPassword());
        user.setName(userVM.getName());
        user.setSex(userVM.getSex());
        user.setBirthday(userVM.getBirthday());
        user.setAddress(userVM.getAddress());
        user.setPartyDate(userVM.getPartyDate());
        user.setBranchId(userVM.getBranchId());
        user.setGeneralbranceId(userVM.getGeneralbranceId());
        boolean flag1 = SqlHelper.retBool(userMapper.insert(user));
        QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("role_name",userVM.getRoleName());
        int roleId = roleMapper.selectOne(queryWrapper).getId();
        UserRole userRole = new UserRole(user.getId(),roleId);
        boolean flag2 = SqlHelper.retBool(userRoleMapper.insert(userRole));
        if(flag1 == flag2 && flag1 == true){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean updateUserVM(UserVM userVM){
        User user = new User();
        user.setId(userVM.getId());
        user.setUsername(userVM.getUsername());
        user.setPassword(userVM.getPassword());
        user.setName(userVM.getName());
        user.setSex(userVM.getSex());
        user.setBirthday(userVM.getBirthday());
        user.setPhone(userVM.getPhone());
        user.setAddress(userVM.getAddress());
        user.setPartyDate(userVM.getPartyDate());
        user.setBranchId(userVM.getBranchId());
        user.setGeneralbranceId(userVM.getGeneralbranceId());
        boolean flag1 = SqlHelper.retBool(userMapper.updateById(user));
        QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("role_name",userVM.getRoleName());
        int roleId = roleMapper.selectOne(queryWrapper).getId();
        boolean flag2 = SqlHelper.retBool(userRoleMapper.updateByUserId(user.getId(),roleId));
        if(flag1 == flag2 && flag1 == true){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean deleteUserVMById(Integer id){
        boolean flag1 = SqlHelper.retBool(userRoleMapper.deleteByUserId(id));
        boolean flag2 = SqlHelper.retBool(userMapper.deleteById(id));
        if(flag1 == flag2 && flag1 == true){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean selectUserByUserName(String userName){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",userName);
        User user = userMapper.selectOne(queryWrapper);
        if(user == null){
            return false;
        }
        else{
            return true;
        }
    }

}
