package com.zerofootprint.backend.service;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ActivityService {

    private final ActivityRepository repository;

    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    public List<Activity> getAll() {
        return repository.findAll();
    }

    public Activity save(Activity activity) {
        return repository.save(activity);
    }

    public Activity getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
    repository.deleteById(id);
    }

    public Page<Activity> searchByName(String name, Pageable pageable) {
    return repository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Activity> getAll(Pageable pageable) {
    return repository.findAll(pageable);
    }

    public List<Activity> getByUserId(Long userId) {
    return repository.findByUserId(userId);
    }

    public Map<String, Double> getSummary(Long userId) {

    List<Object[]> results = repository.getCarbonSummaryByUserId(userId);

    Map<String, Double> summary = new HashMap<>();

    for (Object[] row : results) {
        String name = (String) row[0];
        Double total = (Double) row[1];
        summary.put(name, total);
    }

    return summary;
    }
}