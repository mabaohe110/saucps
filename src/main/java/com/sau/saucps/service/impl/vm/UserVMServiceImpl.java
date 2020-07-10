package com.sau.saucps.service.impl.vm;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.vm.UserVM;
import com.sau.saucps.mapper.vm.UserVMMapper;
import com.sau.saucps.service.vm.IUserVMService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/22
 */
@Service
public class UserVMServiceImpl extends ServiceImpl<UserVMMapper,UserVM>implements IUserVMService {

    @Override
    public Page<UserVM> selectUserVMPage(Page<UserVM> page){
        return page.setRecords(this.baseMapper.selectUserVM(page));
    }

    @Override
    public Page<UserVM> selectUserVMPageByBranchId(int branchId,String roleName,Page<UserVM> page){
//        System.out.println(this.baseMapper.selectUserVM(branchId,roleName,page));
        return page.setRecords(this.baseMapper.selectUserVMByBranchId(branchId,roleName,page));
    }

    @Override
    public Page<UserVM> selectUserVMPageBygBranchId(int gBranchId,Page<UserVM> page){
//        System.out.println(this.baseMapper.selectUserVM(branchId,roleName,page));
        return page.setRecords(this.baseMapper.selectUserVMBygBranchId(gBranchId,page));
    }

    @Override
    public UserVM selectUserVMById(Integer id){
        return this.baseMapper.selectUserVMById(id);
    }

    @Override
    public Page<UserVM> selectUserVMOPageBygBranchId(int gBranchId,Page<UserVM> page){
//        System.out.println(this.baseMapper.selectUserVM(branchId,roleName,page));
        return page.setRecords(this.baseMapper.selectUserVMOBygBranchId(gBranchId,page));
    }
}
