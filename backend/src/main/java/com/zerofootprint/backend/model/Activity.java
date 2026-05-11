package com.zerofootprint.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con usuario
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Relación con cálculo
    @ManyToOne
    @JoinColumn(name = "record_id")
    private CarbonRecord record;

    private String name;

    private double amount;

    private double co2PerUnit;

    public Activity() {}

    public Activity(String name, double amount, double co2PerUnit) {
        this.name = name;
        this.amount = amount;
        this.co2PerUnit = co2PerUnit;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public CarbonRecord getRecord() {
        return record;
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

    // Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setRecord(CarbonRecord record) {
        this.record = record;
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
}