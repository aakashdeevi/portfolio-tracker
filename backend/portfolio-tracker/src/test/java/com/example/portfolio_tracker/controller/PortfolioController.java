package com.example.portfolio_tracker.controller;

import com.example.portfolio_tracker.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/portfolio/value")
    public Double getPortfolioValue() {
        return portfolioService.calculatePortfolioValue();
    }
}
