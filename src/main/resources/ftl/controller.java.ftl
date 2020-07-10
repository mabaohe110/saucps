package ${package.Controller};


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.sau.saucps.service.${table.serviceName};
import com.sau.saucps.entity.${entity};
import com.sau.saucps.utils.R;
import com.sau.saucps.utils.Constant;
import com.sau.saucps.utils.RRException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import java.util.Arrays;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
<#if restControllerStyle>import org.springframework.web.bind.annotation.RestController;
<#else>import org.springframework.stereotype.Controller;
</#if>
<#if superControllerClassPackage??>
 import ${superControllerClassPackage};
</#if>

/**
* <p>
 * ${table.comment!} 前端控制器
 * </p>
*
* @author ${author}
* @since ${date}
* @version v1.0
*/
<#if restControllerStyle>@RestController
<#else>@Controller</#if>
@RequestMapping("<#if package.ModuleName??>/${package.ModuleName}</#if>/<#if controllerMappingHyphenStyle??>${controllerMappingHyphen}<#else>${table.entityPath}</#if>")
<#if kotlin>
class ${table.controllerName}<#if superControllerClass??> : ${superControllerClass}()</#if>
<#else>
<#if superControllerClass??>public class ${table.controllerName} extends ${superControllerClass} {
<#else>public class ${table.controllerName} {
</#if>

@Autowired
private ${table.serviceName} ${(table.serviceName?substring(1))?uncap_first};

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
Page<${entity}> page = new Page<>(pageNum, pageSize);
    if (Constant.SORTOF_ASC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.asc(sortBy));
    } else if (Constant.SORTOF_DESC.equalsIgnoreCase(sortOf)) {
    page.addOrder(OrderItem.desc(sortBy));
    }
    ${(table.serviceName?substring(1))?uncap_first}.page(page);
    return R.ok().put("page", page);
    }


    /**
    * 信息
    */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id) {
    ${entity} ${entity?uncap_first} = ${(table.serviceName?substring(1))?uncap_first}.getById(id);
    if (${entity?uncap_first} == null) {
    throw RRException.notFound(Constant.ERROR_MSG_ID_NOT_EXIST);
    }
    return R.ok().put("${entity?uncap_first}", ${entity?uncap_first});
    }

    /**
    * 保存
    */
    @PostMapping("/save")
    public R save(@Valid @RequestBody ${entity} ${entity?uncap_first}, HttpServletResponse response) {
    if (${entity?uncap_first}.getId() != null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NOT_NEED);
    }
    if (${(table.serviceName?substring(1))?uncap_first}.save(${entity?uncap_first})) {
    return R.created(response).put("${entity?uncap_first}", ${entity?uncap_first});
    }
    throw RRException.serverError();
    }
    /**
    * 删除
    */
    @DeleteMapping("/delete/{id}")
    public R delete(@PathVariable Integer id, HttpServletResponse response) {
    if (${(table.serviceName?substring(1))?uncap_first}.removeById(id)) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 批量删除
    */
    @PostMapping("/batch/delete")
    public R deleteBatch(@RequestBody Integer[] ids, HttpServletResponse response) {
    if (${(table.serviceName?substring(1))?uncap_first}.removeByIds(Arrays.asList(ids))) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

    /**
    * 修改
    */
    @PutMapping("/update")
    public R update(@Valid @RequestBody ${entity} ${entity?uncap_first}, HttpServletResponse response) {
    if (${entity?uncap_first}.getId() == null) {
    throw RRException.badRequest(Constant.ERROR_MSG_ID_NEED);
    }
    if (${(table.serviceName?substring(1))?uncap_first}.updateById(${entity?uncap_first})) {
    return R.noContent(response);
    }
    throw RRException.serverError();
    }

   }
   </#if>
