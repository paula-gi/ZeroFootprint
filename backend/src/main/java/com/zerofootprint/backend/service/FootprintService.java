package com.zerofootprint.backend.service;

import com.zerofootprint.backend.model.Activity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FootprintService {

    public double calculateTotalCo2(List<Activity> activities) {
        return activities.stream()
                .mapToDouble(a -> a.getAmount() * a.getCo2PerUnit())
                .sum();
    }
}