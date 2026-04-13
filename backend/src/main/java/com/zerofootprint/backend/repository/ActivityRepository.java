package com.zerofootprint.backend.repository;

import com.zerofootprint.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByNameContainingIgnoreCase(String name);
}