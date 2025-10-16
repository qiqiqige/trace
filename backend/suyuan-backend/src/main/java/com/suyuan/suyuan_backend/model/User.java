package com.suyuan.suyuan_backend.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data//自动生成属性的常用方法
@Entity //标记一下对应一张表
@Table(name = "users")//表名是users

public class User {
    @Id //标记该字段为主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)//主键自增
    private long id;//用户id
    //对应前端user数据类型里的属性
    @Column(nullable = false)//数据库列非空
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String phone;

    private String avatar;//头像

    @Column(nullable = false)
    private String role = "ROLE_USER";

    @Column(updatable = false)
    private LocalDateTime createdAT;//创建时间,不可修改

    @PrePersist
    protected void onCreate(){
        createdAT = LocalDateTime.now();
    }

}
