package com.zerofootprint.backend.service;

import com.zerofootprint.backend.model.Activity;
import com.zerofootprint.backend.model.User;
import com.zerofootprint.backend.repository.ActivityRepository;
import com.zerofootprint.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityService {

    private final ActivityRepository repository;
    private final UserRepository userRepository;

    public ActivityService(
            ActivityRepository repository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public List<Activity> getAll() {
        return repository.findAll();
    }

    public Activity save(Activity activity) {
        return repository.save(activity);
    }

    public Activity createActivity(Long userId, Activity activity) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        activity.setUser(user);

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