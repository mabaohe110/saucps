package com.sau.saucps.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sau.saucps.entity.File;
import com.sau.saucps.entity.ThemeStudy;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface IThemeStudyService extends IService<ThemeStudy> {
    Boolean deleteByThemeId(int themeId);
}
