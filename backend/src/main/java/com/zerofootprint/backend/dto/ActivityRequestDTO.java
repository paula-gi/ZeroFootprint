package com.zerofootprint.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ActivityRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    public String name;

    @NotNull(message = "El amount es obligatorio")
    @Min(value = 0, message = "El amount no puede ser negativo")
    public Double amount;

    @NotNull(message = "El co2PerUnit es obligatorio")
    @Min(value = 0, message = "El co2PerUnit no puede ser negativo")
    public Double co2PerUnit;
}