package com.sau.saucps;

//import com.sau.saucps.entity.User;
//import com.sau.saucps.mapper.UserMapper;
import com.sau.saucps.entity.User;
import com.sau.saucps.entity.vm.UserVM;
import com.sau.saucps.mapper.UserMapper;
import com.sau.saucps.mapper.vm.UserVMMapper;
import com.sau.saucps.service.IUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/02
 */
@SpringBootTest
@Transactional
public class userTest {

    @Autowired
    UserMapper userMapper;

    @Autowired
    IUserService userService;

    @Autowired
    DataSource dataSource;

    @Autowired
    UserVMMapper userVMMapper;

    @Test
    @Rollback
    public void userMapperTest(){
        User user = new User();
        user.setUsername("mabaohe1");
        user.setPassword("123456");
        user.setName("马宝贺");
        userService.save(user);
        System.out.println(user);
    }

    @Test
    public void testJdbc() throws SQLException {
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
    }

//    @Test
//    public void userVMTest(){
//        List<UserVM> userVMS = userVMMapper.selectUserVM();
//        System.out.println(userVMS);
//    }
}
