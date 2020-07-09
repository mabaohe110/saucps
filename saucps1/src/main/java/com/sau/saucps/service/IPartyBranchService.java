package com.sau.saucps.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sau.saucps.entity.PartyBranch;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface IPartyBranchService extends IService<PartyBranch> {
    boolean selectByName(String name);
    //public List<PartyBranch> listByG(QueryWrapper<PartyBranch> queryWrapper);
}
