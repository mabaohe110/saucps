package com.sau.saucps.user;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sau.saucps.entity.User;
import com.sau.saucps.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/03
 */
@SpringBootTest
@Transactional
@Rollback
public class UserTest {

    @Autowired
    UserMapper userMapper;

    @Test
    public void selectTest(){
        User user = userMapper.selectById(1);
        System.out.println(user);
    }

    @Test
    public void insertTest(){
        User user = new User();
        user.setUsername("haha");
        user.setPassword("123456");
        user.setName("小王");
        userMapper.insert(user);
        System.out.println(user);
    }

    @Test
    public void updateTest(){
        User user = userMapper.selectById(1);
        System.out.println(user);
        user.setName("小李");
        userMapper.updateById(user);
        System.out.println(user);
    }

    @Test
    public void deleteTest(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        List<User> users = userMapper.selectList(queryWrapper.select());
        System.out.println("删除前...");
        for (User user: users){
            System.out.println(user);
        }
        userMapper.deleteById(2);
        users = userMapper.selectList(queryWrapper.select());
        System.out.println("删除后...");
        for (User user: users){
            System.out.println(user);
        }
    }

}
