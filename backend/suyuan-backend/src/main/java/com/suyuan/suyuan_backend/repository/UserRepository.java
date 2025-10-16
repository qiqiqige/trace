package com.suyuan.suyuan_backend.repository;
import com.suyuan.suyuan_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByPhone (String phone);
    boolean existsByUsername (String username);
    boolean existsByPhone (String phone);
}
