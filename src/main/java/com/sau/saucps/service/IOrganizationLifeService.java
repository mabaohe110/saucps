package com.sau.saucps.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.OrganizationDepartment;
import com.sau.saucps.entity.OrganizationLife;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface IOrganizationLifeService extends IService<OrganizationLife> {

    boolean selectLifeByName(String name);
}
