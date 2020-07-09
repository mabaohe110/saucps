package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.extension.toolkit.SqlHelper;
import com.sau.saucps.entity.File;
import com.sau.saucps.entity.StudyLink;
import com.sau.saucps.entity.ThemeStudy;
import com.sau.saucps.mapper.FileMapper;
import com.sau.saucps.mapper.StudyLinkMapper;
import com.sau.saucps.mapper.ThemeStudyMapper;
import com.sau.saucps.service.IFileService;
import com.sau.saucps.service.IThemeStudyService;
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
public class ThemeStudyServiceImpl extends ServiceImpl<ThemeStudyMapper, ThemeStudy> implements IThemeStudyService {

    @Autowired
    private StudyLinkMapper studyLinkMapper;

    @Override
    public Boolean deleteByThemeId(int themeId){
        QueryWrapper<StudyLink> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("theme_id",themeId);
        if(studyLinkMapper.selectList(queryWrapper).isEmpty()){
            return true;
        }
        boolean flag = SqlHelper.retBool(studyLinkMapper.delete(queryWrapper));
        return  flag;
    }
}
