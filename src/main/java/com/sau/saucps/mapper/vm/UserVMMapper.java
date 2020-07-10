package com.sau.saucps.mapper.vm;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sau.saucps.entity.vm.UserVM;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserVMMapper extends BaseMapper<UserVM> {

    @Select("SELECT u.*,r.role_name FROM (user u left join user_role ur on ur.user_id=u.id) left join role r on ur.role_id=r.id")
     List<UserVM> selectUserVM(Page page);
    @Select("SELECT u.*,r.role_name FROM (user u left join user_role ur on ur.user_id=u.id) left join role r on ur.role_id=r.id " +
            "where branch_id = #{branchId} and role_name = #{roleName}")
     List<UserVM> selectUserVMByBranchId(@Param("branchId") int branchId, @Param("roleName") String roleName, Page page);

    @Select("SELECT u.*,r.role_name FROM (user u left join user_role ur on ur.user_id=u.id) left join role r on ur.role_id=r.id \n" +
            "where generalbrance_id = #{gBranchId} and (role_name = '支部书记' || role_name = '组织员')")
    List<UserVM> selectUserVMBygBranchId(@Param("gBranchId") int gBranchId, Page page);

    @Select("SELECT u.*,r.role_name FROM ((user u left join user_role ur on ur.user_id=u.id) left join role r on ur.role_id=r.id)" +
            " where u.username = #{username}")
     UserVM selectUserVMByUsername(String username);

    @Select("SELECT u.*,r.role_name FROM ((user u left join user_role ur on ur.user_id=u.id) left join role r on ur.role_id=r.id)" +
            " where u.id = #{id}")
     UserVM selectUserVMById(Integer id);

    @Select("SELECT u.*,r.role_name FROM (user u left join user_role ur on ur.user_id=u.id) left join role r on ur.role_id=r.id \n" +
            "where generalbrance_id = #{gBranchId} and role_name = '组织部工作人员'")
    List<UserVM> selectUserVMOBygBranchId(@Param("gBranchId") int gBranchId, Page page);

}
