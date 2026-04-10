package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.service.ActivityService;
import com.zerofootprint.backend.service.FootprintService;

import org.springframework.http.ResponseEntity;
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
public ResponseEntity<Activity> create(@RequestBody Activity activity) {
    Activity saved = activityService.save(activity);
    return ResponseEntity.status(201).body(saved);
}

    @GetMapping("/total-co2")
    public double getTotalCo2() {
        return footprintService.calculateTotalCo2(activityService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) {
        Activity activity = activityService.getById(id);

        if (activity == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(activity);
    }

    @DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    Activity activity = activityService.getById(id);

    if (activity == null) {
        return ResponseEntity.notFound().build();
    }

    activityService.delete(id);
    return ResponseEntity.noContent().build();
}

    @PutMapping("/{id}")
public ResponseEntity<Activity> update(@PathVariable Long id, @RequestBody Activity activity) {
    Activity existing = activityService.getById(id);

    if (existing == null) {
        return ResponseEntity.notFound().build();
    }

    existing.setName(activity.getName());
    existing.setAmount(activity.getAmount());
    existing.setCo2PerUnit(activity.getCo2PerUnit());

    Activity updated = activityService.save(existing);

    return ResponseEntity.ok(updated);
}
}