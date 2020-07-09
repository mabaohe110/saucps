package com.sau.saucps.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.File;
import com.sau.saucps.entity.StudyFile;
import com.sau.saucps.entity.StudyLink;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface IStudyFileService extends IService<StudyFile> {

    List<StudyFile> selectByThemeId(int themeId);

}
