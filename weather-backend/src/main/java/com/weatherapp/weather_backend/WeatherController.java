package com.weatherapp.weather_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

@RestController
public class WeatherController {

    @Value("${openweathermap.api.key:your_default_api_key}")
    private String apiKey;

    private static final String WEATHER_API_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

    // /api/weather エンドポイントにGETリクエストが来たときに実行
    // 例: http://localhost:8080/api/weather?city=Tokyo
    @GetMapping(value = "/api/weather", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getWeather(@RequestParam String city) {
        RestTemplate restTemplate = new RestTemplate();

        String apiUrl = String.format("%s?q=%s&appid=%s&units=metric&lang=ja", WEATHER_API_BASE_URL, city, apiKey);

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                return "{\"error\": \"Failed to fetch weather data from OpenWeatherMap. Status: " + response.getStatusCode() + "\"}";
            }
        } catch (Exception e) {
            return "{\"error\": \"An error occurred while fetching weather data: " + e.getMessage() + "\"}";
        }
    }
}