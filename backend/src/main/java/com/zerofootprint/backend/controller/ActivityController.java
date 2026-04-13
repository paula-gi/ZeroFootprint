package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.service.ActivityService;
import com.zerofootprint.backend.service.FootprintService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.zerofootprint.backend.dto.ActivityRequestDTO;
import com.zerofootprint.backend.dto.ActivityResponseDTO;
import jakarta.validation.Valid;

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
    public List<Activity> getAll(@RequestParam(required = false) String name) {

        if (name != null && !name.isEmpty()) {
            return activityService.searchByName(name);
        }

        return activityService.getAll();
    }

   @PostMapping
    public ResponseEntity<ActivityResponseDTO> create(@Valid @RequestBody ActivityRequestDTO dto) {

        Activity activity = new Activity();
        activity.setName(dto.name);
        activity.setAmount(dto.amount);
        activity.setCo2PerUnit(dto.co2PerUnit);

        Activity saved = activityService.save(activity);

        ActivityResponseDTO response = new ActivityResponseDTO();
        response.id = saved.getId();
        response.name = saved.getName();
        response.totalCo2 = saved.getTotalCo2();

            return ResponseEntity.status(201).body(response);
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