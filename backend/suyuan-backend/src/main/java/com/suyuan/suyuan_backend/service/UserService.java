package com.suyuan.suyuan_backend.service;
import com.suyuan.suyuan_backend.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
public interface UserService  extends UserDetailsService {
    User register(User user);
    User findByUsername(String username);
    User findByPhone(String phone);
}
