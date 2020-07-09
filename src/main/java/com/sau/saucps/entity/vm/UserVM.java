package com.sau.saucps.entity.vm;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.sau.saucps.entity.Role;
import com.sau.saucps.entity.User;
import com.sau.saucps.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVM implements Serializable, GrantedAuthority {

    private static final long serialVersionUID = 1L;

    //@TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String name;

    @NotNull
    private String sex;

    //@JsonFormat(pattern = "yyyy-MM-dd")
    private String birthday;

    private String phone;

    private String address;

    //@JsonFormat(pattern = "yyyy-MM-dd")
    private String partyDate;

    private Integer branchId;

    private Integer generalbranceId;

    private String roleName;

    @Override
    public String getAuthority() {
        return roleName;
    }
}
