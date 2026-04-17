package com.zerofootprint.backend.repository;

import com.zerofootprint.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}