package com.zerofootprint.backend.repository;

import com.zerofootprint.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ActivityRepository extends JpaRepository<Activity, Long> {

    Page<Activity> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Activity> findByUserId(Long userId);
}

