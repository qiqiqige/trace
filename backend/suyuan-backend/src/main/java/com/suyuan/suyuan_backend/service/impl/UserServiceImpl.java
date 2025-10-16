package com.suyuan.suyuan_backend.service.impl;

import com.suyuan.suyuan_backend.model.User;
import com.suyuan.suyuan_backend.repository.UserRepository;
import com.suyuan.suyuan_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service//服务类
@RequiredArgsConstructor//自动生成构造
public class UserServiceImpl implements UserService{
    private  final UserRepository userRepository;
    private  final  PasswordEncoder passwordEncoder;

    @Override
    public User register(User user){
        if (userRepository.existsByUsername(user.getUsername())){
            throw new RuntimeException("用户名已存在");
        }
        if (userRepository.existsByPhone(user.getPhone())){
            throw new RuntimeException("手机号已被注册");
        }
        //密码加密
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findByUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }

    @Override
    public User findByPhone(String phone){
        return userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("手机号未注册"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return  org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().replace("ROLE_",""))
                .build();
    }


}
