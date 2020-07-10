package com.sau.saucps.controller;


import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sau.saucps.entity.OrganizationInfo;
import com.sau.saucps.service.IOrganizationInfoService;
import com.sau.saucps.utils.Constant;
import com.sau.saucps.utils.R;
import com.sau.saucps.utils.RRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.net.URLEncoder;
import java.util.Arrays;

/**
* <p>
 *  前端控制器
 * </p>
*
* @author jobob
* @since 2020-03-03
* @version v1.0
*/
@RestController

@RequestMapping("/organization-info")
public class OrganizationInfoController {

@Autowired
private IOrganizationInfoService organizationInfoService;

/**
* 查询分页数据
*/
@GetMapping("/list")
public R list(@RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
@RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
@RequestParam(value = "sortOf", defaultValue = "ASC") String sortOf) {
if ((!Constant.SORTOF_ASC.equalsIgnoreCase(sortOf))) {
if ((!Constant.SORTOF_DESC.equalsIgnoreCase(sortOf))) {
throw RRException.badRequest("sortOf allow ASC or DESC");
}
}
Page<OrganizationInfo> page = new Page<>(pageNum, pageSize);
    if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.asc(sortBy));
    } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.desc(sortBy));
    }
    organizationInfoService.page(page);
    return R.ok().put("page", page);
    }


    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        OrganizationInfo organizationInfo = organizationInfoService.getById(id);
    if (organizationInfo == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("organizationInfo", organizationInfo);
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody OrganizationInfo organizationInfo, HttpServletResponse response) {
    if (organizationInfo.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    if (organizationInfoService.save(organizationInfo)) {
    return R.created(response).put("organizationInfo", organizationInfo);
    }
    throw RRException.serverError();
    }
    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (organizationInfoService.removeById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (organizationInfoService.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody OrganizationInfo organizationInfo, HttpServletResponse response) {
    if (organizationInfo.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    if (organizationInfoService.updateById(organizationInfo)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

//    @GetMapping("/selectInfoByName/{name}")
//    public R selectInfoByName(@PathVariable String name){
//        if(organizationInfoService.selectInfoByName(name)){
//            return R.ok().put("msg","yes");
//        }else{
//            return R.ok().put("msg","no");
//        }
//    }

    @PostMapping("/upload")
    public R upload(MultipartFile file){
        try {
            if(file.isEmpty()){
                return R.ok().put("msg","file is empty");
            }
            String fileName = file.getOriginalFilename();
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            System.out.println(fileName+" "+suffixName);
            String filePath = "E:\\";
            String path = filePath + fileName;
            File dest = new File(path);
            if(!dest.getParentFile().exists()){
                dest.getParentFile().mkdirs();
            }
            file.transferTo(dest);
            R r = new R();
            r.put("msg","upload success");
            r.put("file",fileName);
            return r;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return R.ok().put("msg","upload failed");
    }

    @RequestMapping("/download")
    public R download(@RequestParam String fileName,HttpServletResponse response) throws IOException {
        if(fileName != null){
            File file = new File("E:\\"+fileName);
            if(file.exists()){
                response.setContentType("application/octet-stream");
                response.setHeader("content-type","application/octet-stream");
                response.addHeader("Content-Disposition","attachment;fileName="+ URLEncoder.encode(fileName,"utf-8"));
                byte[] buffer = new byte[1024];
                FileInputStream fileInputStream = null;
                BufferedInputStream bufferedInputStream = null;
                OutputStream outputStream = null;
                try {
                    fileInputStream = new FileInputStream(file);
                    bufferedInputStream = new BufferedInputStream(fileInputStream);
                    outputStream = response.getOutputStream();
//                    int i = bufferedInputStream.read(buffer);
//                    while (i != -1){
//                        outputStream.write(buffer);
//                        i = bufferedInputStream.read(buffer);
//                    }
                    int len = 0;
                    while((len = fileInputStream.read(buffer)) > 0){
                        outputStream.write(buffer,0,len);
                    }
                    return null;
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }finally {
                    outputStream.flush();
                    bufferedInputStream.close();
                    fileInputStream.close();
                }
            }
        }
        return R.ok().put("msg","download failure");
    }

   }
