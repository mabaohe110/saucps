package com.sau.saucps.mapper;

import com.sau.saucps.entity.UserRole;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface UserRoleMapper extends BaseMapper<UserRole> {

    @Update("update user_role set role_id = #{roleId} where user_id = #{userId}")
    Integer updateByUserId(Integer userId,Integer roleId);

    @Delete("delete from user_role where user_id = #{userId}")
    Integer deleteByUserId(Integer userId);

}
