package com.zerofootprint.backend.repository;

import com.zerofootprint.backend.model.CarbonRecord;
import com.zerofootprint.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarbonRecordRepository extends JpaRepository<CarbonRecord, Long> {

    List<CarbonRecord> findByUser(User user);
}
