package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.model.CarbonRecord;
import com.zerofootprint.backend.model.User;
import com.zerofootprint.backend.repository.UserRepository;
import com.zerofootprint.backend.repository.CarbonRecordRepository;
import com.zerofootprint.backend.service.ActivityService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final ActivityService activityService;
    private final CarbonRecordRepository carbonRecordRepository;

    public UserController(UserRepository userRepository,
                           ActivityService activityService,
                           CarbonRecordRepository carbonRecordRepository) {
        this.userRepository = userRepository;
        this.activityService = activityService;
        this.carbonRecordRepository = carbonRecordRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{userId}/activities")
    public List<Activity> getUserActivities(@PathVariable Long userId) {
        return activityService.getByUserId(userId);
    }

    @PostMapping("/{userId}/activities")
    public Activity createActivity(
            @PathVariable Long userId,
            @RequestBody Activity activity) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        activity.setUser(user);
        return activityService.save(activity);
    }

    // Guardar huella de carbono
    @PostMapping("/{userId}/carbon-record")
    public CarbonRecord saveRecord(
            @PathVariable Long userId,
            @RequestBody CarbonRecord record
    ) {
        record.setUserId(userId);
        return carbonRecordRepository.save(record);
    }

    // Historial de la huella de carbono
    @GetMapping("/{userId}/carbon-records")
    public List<CarbonRecord> getHistory(@PathVariable Long userId) {
        return carbonRecordRepository.findByUserId(userId);
    }
}