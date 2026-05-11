package com.zerofootprint.backend.service;

import com.zerofootprint.backend.model.CarbonRecord;
import com.zerofootprint.backend.repository.CarbonRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarbonRecordService {

    private final CarbonRecordRepository carbonRecordRepository;

    public CarbonRecordService(CarbonRecordRepository carbonRecordRepository) {
        this.carbonRecordRepository = carbonRecordRepository;
    }

    public CarbonRecord save(CarbonRecord record) {
        return carbonRecordRepository.save(record);
    }

    public List<CarbonRecord> getByUserId(Long userId) {
        return carbonRecordRepository.findByUserId(userId);
    }
}
