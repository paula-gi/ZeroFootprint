package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.model.CarbonRecord;
import com.zerofootprint.backend.service.CarbonRecordService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/carbon-records")
@CrossOrigin(origins = "*")
public class CarbonRecordController {

    private final CarbonRecordService carbonRecordService;

    public CarbonRecordController(CarbonRecordService carbonRecordService) {
        this.carbonRecordService = carbonRecordService;
    }

    @PostMapping
    public CarbonRecord createRecord(
            @PathVariable Long userId,
            @RequestBody CarbonRecord record
    ) {

        record.setUserId(userId);

        return carbonRecordService.save(record);
    }

    @GetMapping
    public List<CarbonRecord> getRecords(
            @PathVariable Long userId
    ) {
        return carbonRecordService.getByUserId(userId);
    }
}
