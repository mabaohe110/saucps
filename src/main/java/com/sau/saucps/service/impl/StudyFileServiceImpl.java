package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.File;
import com.sau.saucps.entity.StudyFile;
import com.sau.saucps.entity.StudyLink;
import com.sau.saucps.mapper.FileMapper;
import com.sau.saucps.mapper.StudyFileMapper;
import com.sau.saucps.service.IFileService;
import com.sau.saucps.service.IStudyFileService;
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
public class StudyFileServiceImpl extends ServiceImpl<StudyFileMapper, StudyFile> implements IStudyFileService {

    @Autowired
    private StudyFileMapper studyFileMapper;

    @Override
    public List<StudyFile> selectByThemeId(int themeId){
        return studyFileMapper.selectByThemeId(themeId);
    }

}
