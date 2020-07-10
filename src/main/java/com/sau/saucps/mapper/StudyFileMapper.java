package com.sau.saucps.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sau.saucps.entity.File;
import com.sau.saucps.entity.StudyFile;
import com.sau.saucps.entity.StudyLink;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface StudyFileMapper extends BaseMapper<StudyFile> {

    @Select("SELECT * FROM saucps.study_file where theme_id = #{themeId}")
    List<StudyFile> selectByThemeId(@Param("themeId") int themeId);
}
