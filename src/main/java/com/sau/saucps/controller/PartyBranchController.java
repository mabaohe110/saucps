package com.sau.saucps.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.sau.saucps.service.IPartyBranchService;
import com.sau.saucps.entity.PartyBranch;
import com.sau.saucps.utils.R;
import com.sau.saucps.utils.Constant;
import com.sau.saucps.utils.RRException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import java.util.Arrays;
import java.util.List;
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

@RequestMapping("/party-branch")
public class PartyBranchController {

@Autowired
private IPartyBranchService partyBranchService;

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
Page<PartyBranch> page = new Page<>(pageNum, pageSize);
    if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.asc(sortBy));
    } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.desc(sortBy));
    }
    partyBranchService.page(page);
    return R.ok().put("page", page);
    }


    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
    PartyBranch partyBranch = partyBranchService.getById(id);
    if (partyBranch == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("partyBranch", partyBranch);
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody PartyBranch partyBranch, HttpServletResponse response) {
    if (partyBranch.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    if (partyBranchService.save(partyBranch)) {
    return R.created(response).put("partyBranch", partyBranch);
    }
    throw RRException.serverError();
    }
    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (partyBranchService.removeById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (partyBranchService.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody PartyBranch partyBranch, HttpServletResponse response) {
    if (partyBranch.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    if (partyBranchService.updateById(partyBranch)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    @GetMapping("/gBranchList/{id}")
    public R selectGBranch(@PathVariable Integer id){
        QueryWrapper<PartyBranch> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("generalpartybranch_id",id);
        List<PartyBranch> partyBranches = partyBranchService.list(queryWrapper);
        if (partyBranches.size() == 0) {
            throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
        }
        return R.ok().put("partyBranches", partyBranches);
    }

    @GetMapping("/selectByName/{name}")
    public R selectByName(@PathVariable String name){
        if(partyBranchService.selectByName(name)){
            return R.ok().put("msg","yes");
        }else{
            return R.ok().put("msg","no");
        }
    }

   }
