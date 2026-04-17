package com.zerofootprint.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Long id;
    private User user;
    private String name;
    private double amount;
    private double co2PerUnit;

    public Activity() {}

    public Activity(String name, double amount, double co2PerUnit) {
        this.name = name;
        this.amount = amount;
        this.co2PerUnit = co2PerUnit;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getAmount() {
        return amount;
    }

    public double getCo2PerUnit() {
        return co2PerUnit;
    }

    public double getTotalCo2() {
        return amount * co2PerUnit;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setCo2PerUnit(double co2PerUnit) {
        this.co2PerUnit = co2PerUnit;
    }

    public User getUser() {
    return user;
    }

    public void setUser(User user) {
    this.user = user;
    }
}
