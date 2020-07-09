package com.sau.saucps.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.sau.saucps.service.IGeneralPartyBranchService;
import com.sau.saucps.entity.GeneralPartyBranch;
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

@RequestMapping("/general-party-branch")
public class GeneralPartyBranchController {

@Autowired
private IGeneralPartyBranchService generalPartyBranchService;

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
Page<GeneralPartyBranch> page = new Page<>(pageNum, pageSize);
    if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.asc(sortBy));
    } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.desc(sortBy));
    }
    generalPartyBranchService.page(page);
    return R.ok().put("page", page);
    }


    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
    GeneralPartyBranch generalPartyBranch = generalPartyBranchService.getById(id);
    if (generalPartyBranch == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("generalPartyBranch", generalPartyBranch);
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody GeneralPartyBranch generalPartyBranch, HttpServletResponse response) {
    if (generalPartyBranch.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    if (generalPartyBranchService.save(generalPartyBranch)) {
    return R.created(response).put("generalPartyBranch", generalPartyBranch);
    }
    throw RRException.serverError();
    }
    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (generalPartyBranchService.removeById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (generalPartyBranchService.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody GeneralPartyBranch generalPartyBranch, HttpServletResponse response) {
    if (generalPartyBranch.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    if (generalPartyBranchService.updateById(generalPartyBranch)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

   }
