package com.group06.restaurantevent.inventory.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateInventoryItemRequest {
    @NotBlank(message = "Item name is required")
    private String name;

    private String unit;

    @NotNull
    @DecimalMin("0")
    private BigDecimal currentQuantity = BigDecimal.ZERO;

    @NotNull
    @DecimalMin("0")
    private BigDecimal reorderLevel = BigDecimal.ZERO;
}
