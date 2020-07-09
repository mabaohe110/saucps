package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sau.saucps.entity.PartyBranch;
import com.sau.saucps.entity.User;
import com.sau.saucps.mapper.PartyBranchMapper;
import com.sau.saucps.service.IPartyBranchService;
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
public class PartyBranchServiceImpl extends ServiceImpl<PartyBranchMapper, PartyBranch> implements IPartyBranchService {

    @Autowired
    private PartyBranchMapper partyBranchMapper;

    @Override
    public boolean selectByName(String name){
        QueryWrapper<PartyBranch> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name);
        PartyBranch partyBranch = partyBranchMapper.selectOne(queryWrapper);
        if(partyBranch == null){
            return false;
        }
        else{
            return true;
        }
    }

}
