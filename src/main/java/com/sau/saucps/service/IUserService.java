package com.sau.saucps.service;

import com.sau.saucps.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.vm.UserVM;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface IUserService extends IService<User> {

    User userCheck(User user);

    UserVM userVMCheck(UserVM user);

    boolean saveUserVM(UserVM userVM);

    boolean updateUserVM(UserVM userVM);

    boolean deleteUserVMById(Integer id);

    boolean selectUserByUserName(String userName);
}
