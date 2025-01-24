package com.example.portfolio_tracker.service;

import com.example.portfolio_tracker.model.Stock;
import com.example.portfolio_tracker.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    public Double calculatePortfolioValue() {
        List<Stock> stocks = stockRepository.findAll();

        double totalValue = 0.0;
        for (Stock stock : stocks) {
            Double stockPrice = stockPriceService.getStockPrice(stock.getTicker());
            if (stockPrice != null) {
                totalValue += stockPrice * stock.getQuantity();
            }
        }

        return totalValue;
    }
}
