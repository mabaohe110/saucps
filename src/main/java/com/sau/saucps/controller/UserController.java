package com.sau.saucps.controller;


import com.sau.saucps.entity.vm.UserVM;
import com.sau.saucps.service.vm.IUserVMService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.sau.saucps.service.IUserService;
import com.sau.saucps.entity.User;
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

@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IUserVMService userVMService;

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
        Page<User> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        userService.page(page);
        return R.ok().put("page", page);
    }

    @GetMapping("/userVMList")
    public R UserVMList(@RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                  @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                  @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                  @RequestParam(value = "sortOf", defaultValue = "ASC") String sortOf) {
        if ((!Constant.SORTOF_ASC.equalsIgnoreCase(sortOf))) {
            if ((!Constant.SORTOF_DESC.equalsIgnoreCase(sortOf))) {
                throw RRException.badRequest("sortOf allow ASC or DESC");
            }
        }
        Page<UserVM> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        userVMService.selectUserVMPage(page);
        return R.ok().put("page", page);
    }

    @GetMapping("/userVMListByBranchId")
    public R UserVMListByBranchId(
            @RequestParam(value = "branchId") Integer branchId,
            @RequestParam(value = "roleName") String roleName,
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortOf", defaultValue = "ASC") String sortOf) {
        if ((!Constant.SORTOF_ASC.equalsIgnoreCase(sortOf))) {
            if ((!Constant.SORTOF_DESC.equalsIgnoreCase(sortOf))) {
                throw RRException.badRequest("sortOf allow ASC or DESC");
            }
        }
        Page<UserVM> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        userVMService.selectUserVMPageByBranchId(branchId,roleName,page);
        return R.ok().put("page", page);
    }

    @GetMapping("/userVMListBygBranchId")
    public R UserVMListBygBranchId(
            @RequestParam(value = "gBranchId") Integer gBranchId,
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortOf", defaultValue = "ASC") String sortOf) {
        if ((!Constant.SORTOF_ASC.equalsIgnoreCase(sortOf))) {
            if ((!Constant.SORTOF_DESC.equalsIgnoreCase(sortOf))) {
                throw RRException.badRequest("sortOf allow ASC or DESC");
            }
        }
        Page<UserVM> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        userVMService.selectUserVMPageBygBranchId(gBranchId,page);
        return R.ok().put("page", page);
    }

    @GetMapping("/userVMOListBygBranchId")
    public R UserVMOListBygBranchId(
            @RequestParam(value = "gBranchId") Integer gBranchId,
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortOf", defaultValue = "ASC") String sortOf) {
        if ((!Constant.SORTOF_ASC.equalsIgnoreCase(sortOf))) {
            if ((!Constant.SORTOF_DESC.equalsIgnoreCase(sortOf))) {
                throw RRException.badRequest("sortOf allow ASC or DESC");
            }
        }
        Page<UserVM> page = new Page<>(pageNum, pageSize);
        if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.asc(sortBy));
        } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
            page.addOrder(OrderItem.desc(sortBy));
        }
        userVMService.selectUserVMOPageBygBranchId(gBranchId,page);
        return R.ok().put("page", page);
    }

    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
    User user = userService.getById(id);
    if (user == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("user", user);
    }

    @GetMapping("/infoVM/{id}")
    public R infoVM(@PathVariable("id") Integer id) {
        UserVM user = userVMService.selectUserVMById(id);
        if (user == null) {
            throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
        }
        return R.ok().put("user", user);
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody User user, HttpServletResponse response) {
    if (user.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    user = userService.userCheck(user);
    if (userService.save(user)) {
    return R.created(response).put("user", user);
    }
    throw RRException.serverError();
    }

    @PostMapping("/saveUserVM")
    public R saveUserVM(@Valid @RequestBody UserVM user, HttpServletResponse response) {
//        if (user.getId() != null) {
//            throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
//        }
        user = userService.userVMCheck(user);
        if (userService.saveUserVM(user)) {
            return R.created(response).put("user", user);
        }
        throw RRException.serverError();
    }

    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (userService.deleteUserVMById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (userService.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody User user, HttpServletResponse response) {

    if (user.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    user = userService.userCheck(user);
    if (userService.updateById(user)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    @PutMapping("/updateVM")
    public R updateVM(@Valid @RequestBody UserVM user, HttpServletResponse response) {

        if (user.getId() == null) {
            throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
        }
        user = userService.userVMCheck(user);
        if (userService.updateUserVM(user)) {
            return R.noContent(response);
        }
        throw RRException.serverError();
    }


    @RequestMapping("/login")
    public Object login(){
       return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping("/selectByUserName/{userName}")
    public R selectByUserName(@PathVariable String userName){
        if(userService.selectUserByUserName(userName)){
            return R.ok().put("msg","yes");
        }else{
            return R.ok().put("msg","no");
        }
    }

}
