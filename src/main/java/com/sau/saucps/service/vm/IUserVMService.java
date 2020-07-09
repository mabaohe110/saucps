package com.sau.saucps.service.vm;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.vm.UserVM;

public interface IUserVMService extends IService<UserVM> {
    Page<UserVM> selectUserVMPage(Page<UserVM> page);

    Page<UserVM> selectUserVMPageByBranchId(int branchId,String roleName,Page<UserVM> page);

    UserVM selectUserVMById(Integer id);

    Page<UserVM> selectUserVMPageBygBranchId(int gBranchId,Page<UserVM> page);

    Page<UserVM> selectUserVMOPageBygBranchId(int gBranchId,Page<UserVM> page);
}
