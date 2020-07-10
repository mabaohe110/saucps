package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.OrganizationInfo;
import com.sau.saucps.entity.OrganizationRemind;
import com.sau.saucps.mapper.OrganizationInfoMapper;
import com.sau.saucps.mapper.OrganizationRemindMapper;
import com.sau.saucps.service.IOrganizationInfoService;
import com.sau.saucps.service.IOrganizationRemindService;
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
public class OrganizationRemindServiceImpl extends ServiceImpl<OrganizationRemindMapper, OrganizationRemind> implements IOrganizationRemindService {

//    @Autowired
//    private OrganizationLifeMapper organizationLifeMapper;
//
//    @Override
//    public boolean selectLifeByName(String name){
//        QueryWrapper<OrganizationLife> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("name",name);
//        OrganizationLife organizationLife = organizationLifeMapper.selectOne(queryWrapper);
//        if(organizationLife == null){
//            return false;
//        }
//        else{
//            return true;
//        }
//    }

}
