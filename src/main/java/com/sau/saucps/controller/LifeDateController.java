package com.sau.saucps.controller;


import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sau.saucps.entity.LifeDate;
import com.sau.saucps.entity.OrganizationInfo;
import com.sau.saucps.service.ILifeDateService;
import com.sau.saucps.utils.Constant;
import com.sau.saucps.utils.R;
import com.sau.saucps.utils.RRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.text.ParseException;
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

@RequestMapping("/life-date")
public class LifeDateController {

@Autowired
private ILifeDateService lifeDateService;

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
Page<LifeDate> page = new Page<>(pageNum, pageSize);
    if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.asc(sortBy));
    } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.desc(sortBy));
    }
    lifeDateService.page(page);
    return R.ok().put("page", page);
    }


    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
        LifeDate LifeDate = lifeDateService.getById(id);
    if (LifeDate == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("LifeDate", LifeDate);
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody LifeDate LifeDate, HttpServletResponse response) {
    if (LifeDate.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    if (lifeDateService.save(LifeDate)) {
    return R.created(response).put("LifeDate", LifeDate);
    }
    throw RRException.serverError();
    }
    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (lifeDateService.removeById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (lifeDateService.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody LifeDate LifeDate, HttpServletResponse response) {
    if (LifeDate.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    if (lifeDateService.updateById(LifeDate)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    @PutMapping("/updateDate")
    public R updateDate(@Valid @RequestBody OrganizationInfo organizationInfo) throws ParseException {
        if(lifeDateService.updateDate(organizationInfo)){
            return R.ok().put("msg","更新成功");
        }else{
            return R.ok().put("msg","更新失败");
        }
    }

   }
