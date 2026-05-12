package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.model.CarbonRecord;
import com.zerofootprint.backend.model.User;
import com.zerofootprint.backend.repository.UserRepository;
import com.zerofootprint.backend.service.CarbonRecordService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/carbon-records")
@CrossOrigin(origins = "*")
public class CarbonRecordController {

    private final CarbonRecordService carbonRecordService;
    private final UserRepository userRepository;

    public CarbonRecordController(
            CarbonRecordService carbonRecordService,
            UserRepository userRepository
    ) {
        this.carbonRecordService = carbonRecordService;
        this.userRepository = userRepository;
    }    

    @PostMapping
    public CarbonRecord createRecord(
            @PathVariable Long userId,
            @RequestBody CarbonRecord record
    ) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        record.setUser(user);

        return carbonRecordService.save(record);
    }
    

    @GetMapping
    public List<CarbonRecord> getRecords(@PathVariable Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return List.of();
        }

        return carbonRecordService.getByUser(user);
    }
}
