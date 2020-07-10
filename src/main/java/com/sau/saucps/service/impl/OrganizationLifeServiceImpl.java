package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.OrganizationDepartment;
import com.sau.saucps.entity.OrganizationLife;
import com.sau.saucps.entity.User;
import com.sau.saucps.mapper.OrganizationDepartmentMapper;
import com.sau.saucps.mapper.OrganizationLifeMapper;
import com.sau.saucps.service.IOrganizationDepartmentService;
import com.sau.saucps.service.IOrganizationLifeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
@Service
public class OrganizationLifeServiceImpl extends ServiceImpl<OrganizationLifeMapper, OrganizationLife> implements IOrganizationLifeService {

    @Autowired
    private OrganizationLifeMapper organizationLifeMapper;

    @Override
    public boolean selectLifeByName(String name){
        QueryWrapper<OrganizationLife> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name);
        OrganizationLife organizationLife = organizationLifeMapper.selectOne(queryWrapper);
        if(organizationLife == null){
            return false;
        }
        else{
            return true;
        }
    }

}
