package com.sau.saucps.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.sau.saucps.service.IOrganizationDepartmentService;
import com.sau.saucps.entity.OrganizationDepartment;
import com.sau.saucps.utils.R;
import com.sau.saucps.utils.Constant;
import com.sau.saucps.utils.RRException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import java.util.Arrays;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import org.springframework.web.bind.annotation.RestController;

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

@RequestMapping("/organization-department")
public class OrganizationDepartmentController {

@Autowired
private IOrganizationDepartmentService organizationDepartmentService;

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
Page<OrganizationDepartment> page = new Page<>(pageNum, pageSize);
    if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.asc(sortBy));
    } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.desc(sortBy));
    }
    organizationDepartmentService.page(page);
    return R.ok().put("page", page);
    }


    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
    OrganizationDepartment organizationDepartment = organizationDepartmentService.getById(id);
    if (organizationDepartment == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("organizationDepartment", organizationDepartment);
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody OrganizationDepartment organizationDepartment, HttpServletResponse response) {
    if (organizationDepartment.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    if (organizationDepartmentService.save(organizationDepartment)) {
    return R.created(response).put("organizationDepartment", organizationDepartment);
    }
    throw RRException.serverError();
    }
    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (organizationDepartmentService.removeById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (organizationDepartmentService.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody OrganizationDepartment organizationDepartment, HttpServletResponse response) {
    if (organizationDepartment.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    if (organizationDepartmentService.updateById(organizationDepartment)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

   }
