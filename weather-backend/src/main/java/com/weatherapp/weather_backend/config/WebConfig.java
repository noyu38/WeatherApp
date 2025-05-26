// src/main/java/com/weatherapp/weather_backend/config/WebConfig.java
package com.weatherapp.weather_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // このクラスがSpringの設定クラスであることを示す
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // /api/で始まるすべてのパスに対してCORSを適用
                .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173") // 許可するオリジン
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するHTTPメソッド
                .allowedHeaders("*") // すべてのヘッダーを許可
                .allowCredentials(true); // クレデンシャル（Cookieなど）の送信を許可
    }
}