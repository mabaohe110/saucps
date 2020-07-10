package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.LifeDate;
import com.sau.saucps.entity.OrganizationInfo;
import com.sau.saucps.entity.OrganizationLife;
import com.sau.saucps.mapper.LifeDateMapper;
import com.sau.saucps.mapper.OrganizationInfoMapper;
import com.sau.saucps.mapper.OrganizationLifeMapper;
import com.sau.saucps.service.ILifeDateService;
import com.sau.saucps.service.IOrganizationInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
@Service
public class LifeDateServiceImpl extends ServiceImpl<LifeDateMapper, LifeDate> implements ILifeDateService {

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

    @Autowired
    private LifeDateMapper lifeDateMapper;

    @Autowired
    private OrganizationLifeMapper organizationLifeMapper;

    public boolean updateDate(OrganizationInfo organizationInfo) throws ParseException {
        int lifeId = organizationInfo.getLifeId();
        String date = organizationInfo.getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        QueryWrapper<LifeDate> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("life_id",lifeId);
        LifeDate lifeDate = lifeDateMapper.selectOne(queryWrapper);
        OrganizationLife organizationLife = organizationLifeMapper.selectById(lifeId);
        String lifeName = organizationLife.getName();
        if(dateFormat.parse(lifeDate.getLastDate()).getTime() < dateFormat.parse(date).getTime()){
            if(lifeName.equals("支部委员会")){
                lifeDate.setLastDate(date);
                Calendar ca = Calendar.getInstance();
                ca.setTime(dateFormat.parse(lifeDate.getLastDate()));
                ca.add(Calendar.MONTH,2);
                ca.set(Calendar.DAY_OF_MONTH,0);
                lifeDate.setNextDate(dateFormat.format(ca.getTime()));
                lifeDate.setCount(lifeDate.getCount()+1);
                lifeDateMapper.updateById(lifeDate);
            }
            else if(lifeName.equals("支部党员大会")){
                lifeDate.setLastDate(date);
                Calendar ca = Calendar.getInstance();
                ca.setTime(dateFormat.parse(lifeDate.getLastDate()));
                if(ca.get(Calendar.MONTH) == 1 || ca.get(Calendar.MONTH) == 2 || ca.get(Calendar.MONTH) == 3 ){
                    ca.set(Calendar.MONTH,6);
                }
                else if(ca.get(Calendar.MONTH) == 4 || ca.get(Calendar.MONTH) == 5 || ca.get(Calendar.MONTH) == 6 ){
                    ca.set(Calendar.MONTH,9);
                }
                else if(ca.get(Calendar.MONTH) == 7 || ca.get(Calendar.MONTH) == 8 || ca.get(Calendar.MONTH) == 9 ){
                    ca.set(Calendar.MONTH,12);
                }
                else if(ca.get(Calendar.MONTH) == 10 || ca.get(Calendar.MONTH) == 11 || ca.get(Calendar.MONTH) == 12 ){
                    ca.set(Calendar.MONTH,3);
                    ca.add(Calendar.YEAR,1);
                }
                //1+1
                ca.set(Calendar.DAY_OF_MONTH,0);
                lifeDate.setNextDate(dateFormat.format(ca.getTime()));
                lifeDate.setCount(lifeDate.getCount()+1);
                lifeDateMapper.updateById(lifeDate);
            }
            else if(lifeName.equals("党小组会")){
                lifeDate.setLastDate(date);
                Calendar ca = Calendar.getInstance();
                ca.setTime(dateFormat.parse(lifeDate.getLastDate()));
                ca.add(Calendar.MONTH,2);
                ca.set(Calendar.DAY_OF_MONTH,0);
                lifeDate.setNextDate(dateFormat.format(ca.getTime()));
                lifeDate.setCount(lifeDate.getCount()+1);
                lifeDateMapper.updateById(lifeDate);
            }
            else if(lifeName.equals("党课")){
                lifeDate.setLastDate(date);
                lifeDate.setCount(lifeDate.getCount()+1);
                lifeDateMapper.updateById(lifeDate);
            }
            return true;
        }else{
            return false;
        }
    }

}
