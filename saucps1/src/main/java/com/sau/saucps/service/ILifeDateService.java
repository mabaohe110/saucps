package com.sau.saucps.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.LifeDate;
import com.sau.saucps.entity.OrganizationInfo;

import java.text.ParseException;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface ILifeDateService extends IService<LifeDate> {

   // boolean selectLifeByName(String name);

    boolean updateDate(OrganizationInfo organizationInfo) throws ParseException;
}
