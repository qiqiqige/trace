package com.suyuan.suyuan_backend.controller;

import com.suyuan.suyuan_backend.config.JwtUtil;
import com.suyuan.suyuan_backend.model.User;
import com.suyuan.suyuan_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController//REST控制器，返回json数据
@RequestMapping("/api/auth")//统一前缀
@CrossOrigin(origins = "http://localhost:3000")//允许跨域
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;//security自带的认证
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")//login接口
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String,String> loginData){
        try {
            //验证用户名密码
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.get("username"),
                            loginData.get("password")
                    )
            );
        }catch (Exception e){
            Map<String ,Object> error = new HashMap<>();
            error.put("code",401);
            error.put("msg","用户名或密码错误");
            return ResponseEntity.ok(error);
        }
        //生成token
        UserDetails userDetails = userService.loadUserByUsername(loginData.get("username"));
        String token = jwtUtil.generateToken(userDetails.getUsername());

        //查询完整用户信息（不包含密码）
        User user = userService.findByUsername(loginData.get("username"));
        user.setPassword(null);//清空密码

        //生成返回给前端的结果
        Map<String,Object> response = new HashMap<>();
        response.put("code",200);
        response.put("msg","登陆成功");
        Map<String ,Object> data = new HashMap<>();
        data.put("user",user);
        data.put("token",token);
        response.put("data",data);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String ,Object>> register(@RequestBody User user){
        try {
            User newUser = userService.register(user);
            newUser.setPassword(null);//密码不返回

            Map<String ,Object> response = new HashMap<>();
            response.put("code", 200);
            response.put("msg","注册成功");
            response.put("data",newUser);
            return ResponseEntity.ok(response);
        }catch (RuntimeException e){
            Map<String,Object> error = new HashMap<>();
            error.put("code",400);
            error.put("msg",e.getMessage());
            return ResponseEntity.ok(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(org.springframework.security.core.Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            user.setPassword(null);

            Map<String, Object> response = new HashMap<>();
            response.put("code", 200);
            response.put("msg", "验证成功");
            response.put("data", user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("code", 401);
            error.put("msg", "Token无效或已过期");
            return ResponseEntity.ok(error);
        }
    }

    @PostMapping("/forgot")
    public ResponseEntity<Map<String ,Object>> forgotPassword(
            @RequestBody Map<String,String> data){
        try {
            userService.findByPhone(data.get("phone"));
            Map<String,Object> response = new HashMap<>();
            response.put("code",200);
            response.put("msg","验证码已经发送到手机");//后期需要对接到短信服务
            return ResponseEntity.ok(response);
        }catch (Exception e){
            Map<String ,Object> error = new HashMap<>();
            error.put("code",400);
            error.put("msg",e.getMessage());
            return ResponseEntity.ok(error);
        }
    }

}
