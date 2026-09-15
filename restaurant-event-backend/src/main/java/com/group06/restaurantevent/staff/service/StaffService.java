package com.group06.restaurantevent.staff.service;

import com.group06.restaurantevent.common.enums.AssignmentStatus;
import com.group06.restaurantevent.common.enums.EmploymentStatus;
import com.group06.restaurantevent.common.enums.ShiftStatus;
import com.group06.restaurantevent.common.exception.BadRequestException;
import com.group06.restaurantevent.common.exception.ConflictException;
import com.group06.restaurantevent.common.exception.ResourceNotFoundException;
import com.group06.restaurantevent.staff.dto.request.CreateShiftRequest;
import com.group06.restaurantevent.staff.dto.request.CreateStaffProfileRequest;
import com.group06.restaurantevent.staff.dto.response.ShiftAssignmentResponse;
import com.group06.restaurantevent.staff.dto.response.ShiftResponse;
import com.group06.restaurantevent.staff.dto.response.StaffProfileResponse;
import com.group06.restaurantevent.staff.entity.Shift;
import com.group06.restaurantevent.staff.entity.ShiftAssignment;
import com.group06.restaurantevent.staff.entity.StaffProfile;
import com.group06.restaurantevent.staff.repository.ShiftAssignmentRepository;
import com.group06.restaurantevent.staff.repository.ShiftRepository;
import com.group06.restaurantevent.staff.repository.StaffProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffProfileRepository profileRepository;
    private final ShiftRepository shiftRepository;
    private final ShiftAssignmentRepository assignmentRepository;

    public List<StaffProfileResponse> listStaff() {
        return profileRepository.findByIsActiveTrueOrderByEmployeeCodeAsc()
                .stream().map(this::toProfileResponse).toList();
    }

    @Transactional
    public StaffProfileResponse createProfile(CreateStaffProfileRequest req) {
        StaffProfile profile = StaffProfile.builder()
                .userId(req.getUserId())
                .employeeCode(generateEmpCode())
                .jobTitle(req.getJobTitle())
                .employmentStatus(parseStatus(req.getEmploymentStatus()))
                .joinedDate(req.getJoinedDate() != null ? req.getJoinedDate() : LocalDate.now())
                .isActive(true)
                .build();
        return toProfileResponse(profileRepository.save(profile));
    }

    @Transactional
    public StaffProfileResponse updateProfile(Long id, CreateStaffProfileRequest req) {
        StaffProfile p = findProfile(id);
        p.setJobTitle(req.getJobTitle());
        p.setEmploymentStatus(parseStatus(req.getEmploymentStatus()));
        return toProfileResponse(profileRepository.save(p));
    }

    @Transactional
    public void toggleActive(Long id, boolean active) {
        StaffProfile p = findProfile(id);
        p.setActive(active);
        profileRepository.save(p);
    }

    public List<ShiftResponse> listShifts(LocalDate date) {
        List<Shift> shifts = date != null
                ? shiftRepository.findByShiftDateOrderByStartTimeAsc(date)
                : shiftRepository.findAllByOrderByShiftDateAscStartTimeAsc();
        return shifts.stream().map(this::toShiftResponse).toList();
    }

    @Transactional
    public ShiftResponse createShift(CreateShiftRequest req) {
        Shift shift = Shift.builder()
                .shiftDate(req.getShiftDate())
                .startTime(req.getStartTime())
                .endTime(req.getEndTime())
                .roleRequired(req.getRoleRequired())
                .requiredStaffCount(req.getRequiredStaffCount())
                .status(ShiftStatus.SCHEDULED)
                .build();
        return toShiftResponse(shiftRepository.save(shift));
    }

    @Transactional
    public void deleteShift(Long id) {
        Shift shift = findShift(id);
        if (shift.getStatus() != ShiftStatus.SCHEDULED)
            throw new BadRequestException("Only SCHEDULED shifts can be deleted");
        shift.setStatus(ShiftStatus.CANCELLED);
        shiftRepository.save(shift);
    }

    @Transactional
    public ShiftAssignmentResponse assignStaff(Long shiftId, Long staffId) {
        Shift shift = findShift(shiftId);
        StaffProfile staff = findProfile(staffId);

        if (!assignmentRepository.findOverlapping(staffId, shift.getShiftDate(),
                shift.getStartTime(), shift.getEndTime()).isEmpty())
            throw new ConflictException("Staff member already has an overlapping shift on this date");

        if (assignmentRepository.findByShift_IdAndStaffId(shiftId, staffId).isPresent())
            throw new ConflictException("Staff already assigned to this shift");

        ShiftAssignment assignment = ShiftAssignment.builder()
                .shift(shift)
                .staffId(staffId)
                .assignedRole(shift.getRoleRequired())
                .status(AssignmentStatus.ASSIGNED)
                .build();
        return toAssignmentResponse(assignmentRepository.save(assignment));
    }

    @Transactional
    public void unassignStaff(Long shiftId, Long staffId) {
        ShiftAssignment assignment = assignmentRepository.findByShift_IdAndStaffId(shiftId, staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));
        assignmentRepository.delete(assignment);
    }

    public List<ShiftAssignmentResponse> listAssignments(Long shiftId) {
        return assignmentRepository.findByShift_Id(shiftId)
                .stream().map(this::toAssignmentResponse).toList();
    }

    private StaffProfile findProfile(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff profile not found: " + id));
    }

    private Shift findShift(Long id) {
        return shiftRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shift not found: " + id));
    }

    private String generateEmpCode() {
        String suffix = String.format("%04d", new Random().nextInt(9999));
        String code = "EMP-" + suffix;
        return profileRepository.existsByEmployeeCode(code) ? generateEmpCode() : code;
    }

    private EmploymentStatus parseStatus(String s) {
        try { return EmploymentStatus.valueOf(s.toUpperCase()); }
        catch (Exception e) { return EmploymentStatus.FULL_TIME; }
    }

    private StaffProfileResponse toProfileResponse(StaffProfile p) {
        return StaffProfileResponse.builder()
                .id(p.getId()).userId(p.getUserId())
                .employeeCode(p.getEmployeeCode()).jobTitle(p.getJobTitle())
                .employmentStatus(p.getEmploymentStatus().name())
                .joinedDate(p.getJoinedDate()).isActive(p.isActive()).build();
    }

    public ShiftResponse toShiftResponse(Shift s) {
        List<ShiftAssignmentResponse> assignments = assignmentRepository.findByShift_Id(s.getId())
                .stream().map(this::toAssignmentResponse).toList();
        return ShiftResponse.builder()
                .id(s.getId()).shiftDate(s.getShiftDate())
                .startTime(s.getStartTime()).endTime(s.getEndTime())
                .roleRequired(s.getRoleRequired())
                .requiredStaffCount(s.getRequiredStaffCount())
                .status(s.getStatus().name()).assignments(assignments).build();
    }

    private ShiftAssignmentResponse toAssignmentResponse(ShiftAssignment a) {
        return ShiftAssignmentResponse.builder()
                .id(a.getId()).shiftId(a.getShift().getId())
                .staffId(a.getStaffId()).assignedRole(a.getAssignedRole())
                .status(a.getStatus().name()).build();
    }
}
