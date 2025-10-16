package com.suyuan.suyuan_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration // 标记为配置类，专门定义通用Bean
public class BeanConfig {

    // 把PasswordEncoder定义在这里，不再放在SecurityConfig里
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 密码加密器，和之前功能一样
    }
}