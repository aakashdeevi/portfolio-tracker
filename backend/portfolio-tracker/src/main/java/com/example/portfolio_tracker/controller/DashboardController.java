package com.example.portfolio_tracker.controller;

import com.example.portfolio_tracker.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardMetrics() {
        return dashboardService.getDashboardMetrics();
    }

}
