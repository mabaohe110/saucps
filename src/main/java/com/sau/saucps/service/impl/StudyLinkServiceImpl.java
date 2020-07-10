package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.StudyLink;
import com.sau.saucps.entity.ThemeStudy;
import com.sau.saucps.mapper.StudyLinkMapper;
import com.sau.saucps.mapper.ThemeStudyMapper;
import com.sau.saucps.service.IStudyLinkService;
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
public class StudyLinkServiceImpl extends ServiceImpl<StudyLinkMapper, StudyLink> implements IStudyLinkService {

    @Autowired
    private StudyLinkMapper studyLinkMapper;

    @Override
    public List<StudyLink> selectByThemeId(int themeId){
        return studyLinkMapper.selectByThemeId(themeId);
    }

}
