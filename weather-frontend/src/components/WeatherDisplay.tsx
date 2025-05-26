import React, { useState } from 'react';
import styles from '../css/WeatherDisplay.module.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  } [];
  wind: {
    speed: number;
  };
}

const WeatherDisplay: React.FC = () => {
  // ユーザーが入力する都市名を管理
  const [city, setCity] = useState<string>('');
  // 取得した天気データを管理
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // エラーメッセージを管理
  const [error, setError] = useState<string | null>(null);
  // ローディング状態を管理
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const response = await fetch(`http://localhost:8080/api/weather?city=${city}`);

      if (!response.ok) {
        // HTTPエラーレスポンスの場合
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: WeatherData = await response.json(); // レスポンスをJSONとしてパース

      if ((data as any).cod && (data as any).cod !== 200) {
        throw new Error(`Error: ${(data as any).message}`);
      }
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`天気情報の取得に失敗しました`);
      } else {
        setError('不明なエラーが発生しました。');
      }
      console.error("Failed to fetch weather:", err);
    } finally {
      setLoading(false);
    }
  };

  // フォームの送信（ボタンクリック）時の処理
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // ページの再読み込みを防ぐ
    if (city.trim()) {
      fetchWeather();
    } else {
      setError('都市名を入力してください。');
    }
  };

  return (
    <div className={styles.container}>
      <h2>都市の天気予報</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力してください (例: Tokyo)"
          className={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? '読み込み中...' : '天気を取得'}
        </button>
      </form>

      {error && (
        <p className={styles.weatherDataContainer}>{error}</p>
      )}

      {weatherData && (
        <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>{weatherData.name} の天気</h3>
          <p>現在の気温: {weatherData.main.temp}°C (体感: {weatherData.main.feels_like}°C)</p>
          <p>湿度: {weatherData.main.humidity}%</p>
          <p>天気: {weatherData.weather[0]?.description || 'N/A'}</p>
          {weatherData.weather[0]?.icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather icon"
              className={styles.weatherIcon}
            />
          )}
          <p>風速: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;