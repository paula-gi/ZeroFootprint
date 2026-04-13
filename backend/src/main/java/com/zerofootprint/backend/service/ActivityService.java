package com.zerofootprint.backend.service;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Activity> searchByName(String name) {
    return repository.findByNameContainingIgnoreCase(name);
    }
}