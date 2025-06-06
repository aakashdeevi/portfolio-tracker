package com.example.portfolio_tracker.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StockPriceService {
    private static final String API_KEY = "cu5vlahr01qujm3peu90cu5vlahr01qujm3peu9g"; // Replace with your Finhub API key
    private static final String API_URL = "https://finnhub.io/api/v1/quote";

    public Double getStockPrice(String ticker) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = API_URL + "?symbol=" + ticker + "&token=" + API_KEY;
            // Fetching the response as a String
            String response = restTemplate.getForObject(url, String.class);
            // Extracting stock price from the response
            return extractStockPriceFromResponse(response);
        } catch (Exception e) {
            System.err.println("Error fetching stock price for ticker: " + ticker);
            e.printStackTrace();
            return null;
        }
    }

    private Double extractStockPriceFromResponse(String response) {
        try {
            // Parsing the JSON manually (or use a library like Jackson)
            String searchKey = "\"c\":";
            int startIndex = response.indexOf(searchKey) + searchKey.length();
            int endIndex = response.indexOf(",", startIndex);
            String priceString = response.substring(startIndex, endIndex);

            return Double.parseDouble(priceString);
        } catch (Exception e) {
            System.err.println("Error parsing stock price response.");
            e.printStackTrace();
            return null;
        }
    }
}
