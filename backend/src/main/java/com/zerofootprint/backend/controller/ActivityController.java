package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.service.ActivityService;
import com.zerofootprint.backend.service.FootprintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService activityService;
    private final FootprintService footprintService;

    public ActivityController(ActivityService activityService, FootprintService footprintService) {
        this.activityService = activityService;
        this.footprintService = footprintService;
    }

    @GetMapping
    public List<Activity> getAll() {
        return activityService.getAll();
    }

    @PostMapping
    public Activity create(@RequestBody Activity activity) {
        return activityService.save(activity);
    }

    @GetMapping("/total-co2")
    public double getTotalCo2() {
        return footprintService.calculateTotalCo2(activityService.getAll());
    }

    @GetMapping("/{id}")
    public Activity getById(@PathVariable Long id) {
        return activityService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        activityService.delete(id);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id, @RequestBody Activity activity) {
        Activity existing = activityService.getById(id);

        if (existing == null) {
            return null; 
    }

        existing.setName(activity.getName());
        existing.setAmount(activity.getAmount());
        existing.setCo2PerUnit(activity.getCo2PerUnit());

        return activityService.save(existing);
    }
}