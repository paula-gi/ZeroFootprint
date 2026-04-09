package com.zerofootprint.backend.repository;

import com.zerofootprint.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}