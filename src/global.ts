export interface location {
  state: string,
  county: string

}

export interface weatherLog{
  temp: number;
  forcast: string;
  humidity: number
  location: location;
}

export interface weatherData {
  todayForcast: weatherLog;
  tomorrowForcast: weatherLog;
}
