package com.sau.saucps.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sau.saucps.entity.StudyLink;
import com.sau.saucps.entity.ThemeStudy;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
public interface StudyLinkMapper extends BaseMapper<StudyLink> {

    @Select("SELECT * FROM saucps.study_link where theme_id = #{themeId}")
    List<StudyLink> selectByThemeId(@Param("themeId") int themeId);

}
