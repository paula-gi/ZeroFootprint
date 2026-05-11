package com.zerofootprint.backend.repository;

import com.zerofootprint.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ActivityRepository extends JpaRepository<Activity, Long> {

    Page<Activity> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Activity> findByUserId(Long userId);

    @Query("""
    SELECT a.name, SUM(a.amount * a.co2PerUnit)
    FROM Activity a
    WHERE a.user.id = :userId
    GROUP BY a.name
    """)
    List<Object[]> getCarbonSummaryByUserId(@Param("userId") Long userId);
}

