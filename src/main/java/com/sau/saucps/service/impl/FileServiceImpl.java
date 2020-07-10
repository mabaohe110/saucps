package com.sau.saucps.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sau.saucps.entity.File;
import com.sau.saucps.entity.GeneralPartyBranch;
import com.sau.saucps.mapper.FileMapper;
import com.sau.saucps.mapper.GeneralPartyBranchMapper;
import com.sau.saucps.service.IFileService;
import com.sau.saucps.service.IGeneralPartyBranchService;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2020-03-03
 */
@Service
public class FileServiceImpl extends ServiceImpl<FileMapper, File> implements IFileService {

}
