package com.weatherapp.weather_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class WeatherBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeatherBackendApplication.class, args);
    }
}