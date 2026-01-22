export interface location {
  state: string,
  county: string

}

export interface weatherLog{
  temp: number;
  forecast: string;
  humidity: number
  location: location;
}

export interface weatherData {
  todayForecast: weatherLog;
  tomorrowForecast: weatherLog;
}
