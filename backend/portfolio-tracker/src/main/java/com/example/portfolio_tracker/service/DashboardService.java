package com.example.portfolio_tracker.service;

import com.example.portfolio_tracker.model.Stock;
import com.example.portfolio_tracker.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    public Map<String, Object> getDashboardMetrics() {
        List<Stock> stocks = stockRepository.findAll();
        double totalValue = 0.0;
        double totalInvestedValue = 0.0;
        String topStock = null;
        double highestValue = 0.0;
        String leastStock = null;
        double lowestValue = Double.MAX_VALUE;
        Map<String, Double> portfolioDistribution = new HashMap<>();
        Map<String, Map<String, Double>> gainLossAnalytics = new HashMap<>();
        double netGainLoss = 0.0;

        // Create a list to hold stock information for table
        List<Map<String, Object>> stockHoldings = new ArrayList<>();

        for (Stock stock : stocks) {
            Double stockPrice = stockPriceService.getStockPrice(stock.getTicker());
            if (stockPrice != null) {
                double stockValue = stockPrice * stock.getQuantity();
                totalValue += stockValue;

                // Update total invested value (buy price * quantity)
                Double buyPrice = stock.getBuyPrice() == null ? 0.0 : stock.getBuyPrice();
                double totalBuyPrice = buyPrice * stock.getQuantity();
                totalInvestedValue += totalBuyPrice;

                // Calculate gain/loss for each stock
                double gainLoss = stockValue - totalBuyPrice;

                // Create a map to store stock price, gain/loss, and percentage change
                Map<String, Double> stockMetrics = new HashMap<>();
                stockMetrics.put("gainLoss", gainLoss);
                stockMetrics.put("currentPrice", stockPrice);

                // Calculate percentage change for each stock (gain/loss percentage)
                double percentageChange = totalBuyPrice == 0 ? 0 : (gainLoss / totalBuyPrice) * 100;
                stockMetrics.put("percentageChange", Math.round(percentageChange * 100.0) / 100.0);

                gainLossAnalytics.put(stock.getTicker(), stockMetrics);

                // Add the stock's data to the list for table rendering
                Map<String, Object> stockData = new HashMap<>();
                stockData.put("ticker", stock.getTicker());
                stockData.put("quantity", stock.getQuantity());
                stockData.put("buyPrice", buyPrice);
                stockData.put("currentPrice", stockPrice);
                stockData.put("gainLoss", gainLoss);
                stockHoldings.add(stockData);

                // Determine the top-performing stock (highest value)
                if (stockValue > highestValue) {
                    highestValue = stockValue;
                    topStock = stock.getTicker();
                }

                // Determine the least-performing stock (lowest value)
                if (stockValue < lowestValue) {
                    lowestValue = stockValue;
                    leastStock = stock.getTicker();
                }

                // Add to portfolio distribution
                portfolioDistribution.put(stock.getTicker(), stockValue);
            }
        }

        // Normalize portfolio distribution to percentages
        for (String ticker : portfolioDistribution.keySet()) {
            double value = portfolioDistribution.get(ticker);
            portfolioDistribution.put(ticker, (value / totalValue) * 100);
        }

        // Calculate net gain/loss for the entire portfolio
        netGainLoss = totalValue - totalInvestedValue;

        // Create the dashboard metrics map to return
        Map<String, Object> dashboardMetrics = new HashMap<>();
        dashboardMetrics.put("totalValue", totalValue);
        dashboardMetrics.put("totalInvestedValue", totalInvestedValue);
        dashboardMetrics.put("netGainLoss", netGainLoss);
        dashboardMetrics.put("topStock", topStock);
        dashboardMetrics.put("topStockPercentageGain", gainLossAnalytics.get(topStock).get("percentageChange"));
        dashboardMetrics.put("leastStock", leastStock);
        dashboardMetrics.put("leastStockPercentageLoss", gainLossAnalytics.get(leastStock).get("percentageChange"));
        dashboardMetrics.put("portfolioDistribution", portfolioDistribution);
        dashboardMetrics.put("gainLossAnalytics", gainLossAnalytics);
        dashboardMetrics.put("stockHoldings", stockHoldings);  // Add stock holdings to the response

        return dashboardMetrics;
    }
}
