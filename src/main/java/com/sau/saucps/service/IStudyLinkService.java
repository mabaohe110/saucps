package com.sau.saucps.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.StudyLink;
import com.sau.saucps.entity.ThemeStudy;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface IStudyLinkService extends IService<StudyLink> {
    List<StudyLink> selectByThemeId(int themeId);
}
