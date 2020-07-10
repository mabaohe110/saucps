package com.sau.saucps.controller;

import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sau.saucps.entity.GeneralPartyBranch;
import com.sau.saucps.service.IFileService;
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
 * @description:
 * @author:马宝贺
 * @date:2020/04/16
 */
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private IFileService iFileService;

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
    public R download(@RequestParam Integer id,@RequestParam String fileName,HttpServletResponse response) throws IOException {
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
                    com.sau.saucps.entity.File file1 = iFileService.getById(id);
                    file1.setCount(file1.getCount()+1);
                    iFileService.updateById(file1);
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
        Page<com.sau.saucps.entity.File> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        iFileService.page(page);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        com.sau.saucps.entity.File file = iFileService.getById(id);
        if (file == null) {
            throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
        }
        return R.ok().put("file", file);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public R save(@Valid @RequestBody com.sau.saucps.entity.File file, HttpServletResponse response) {
        if (file.getId() != null) {
            throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
        }
        System.out.println(file.toString());
        if (iFileService.save(file)) {
            return R.created(response).put("file", file);
        }
        throw RRException.serverError();
    }
    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
        com.sau.saucps.entity.File myFile = iFileService.getById(id);
        File file = new File("E://"+myFile.getName());
        if (iFileService.removeById(id) && file.delete()) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 批量删除
     */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
        if (iFileService.removeByIds(Arrays.asList(ids))) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public R update(@Valid @RequestBody com.sau.saucps.entity.File file, HttpServletResponse response) {
        if (file.getId() == null) {
            throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
        }
        if (iFileService.updateById(file)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }
}
