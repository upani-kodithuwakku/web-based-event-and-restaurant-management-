package com.group06.restaurantevent.staff.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class StaffProfileResponse {
    private Long id;
    private Long userId;
    private String employeeCode;
    private String jobTitle;
    private String employmentStatus;
    private LocalDate joinedDate;
    private boolean isActive;
}
