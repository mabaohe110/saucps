package com.sau.saucps.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sau.saucps.entity.vm.UserVM;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @description:
 * @author:马宝贺
 * @date:2020/03/26
 */
@Data
public class MyUserDetails implements UserDetails {

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String name;

    @NotNull
    private Integer branchId;

    @NotNull
    private Integer generalbranceId;

    @JsonIgnore
    private List<UserVM> roleName;

    public MyUserDetails(@NotNull String username, @NotNull String password, List<UserVM> roleName
            , @NotNull String name, @NotNull Integer branchId,@NotNull Integer generalbranceId) {
        this.username = username;
        this.password = password;
        this.roleName = roleName;
        this.name = name;
        this.branchId = branchId;
        this.generalbranceId = generalbranceId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_"+ roleName.get(0).getAuthority()));
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
