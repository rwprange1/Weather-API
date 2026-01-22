import axios from 'axios';
import type { location, weatherData, weatherLog } from './global';



export async function getWeatherData(long: number, lat: number){
    console.log("ello");
    let s: string = `https://api.weather.gov/points/${lat},${long}`;
    try {
        let response =  await axios.get(s);
        if (response.status === 200){

            
            let dict =
            {
                "forecast" : response.data.properties.forecast,
                "county": response.data.properties.county,
                "grid": response.data.properties.forecastGridData

            };
            console.log(JSON.stringify(dict));
            let location: location = await getLocation(dict.county);
            let weatherInfo: weatherData = await getWeatherInfo(dict.forecast, dict.grid);
            
            weatherInfo.todayForecast.location = location;
            console.log(JSON.stringify(weatherInfo));
            return weatherInfo;
        }
        throw "bad response"
        //console.log(response.data.properties);
    } catch (error: any){
        console.error("Error from weather API");
        throw "bad response"
    }
    

}


async function getLocation(link:string): Promise<location>{
    try {
        let response = await axios.get(link);
        if (response.status === axios.HttpStatusCode.Ok){
            let toRet:location  = {
                state: response.data.properties.state,
                county: response.data.properties.name,
            }
            return toRet;
        }else {
            throw "Error getting location data";
        }
    } catch(err:any) {
        throw err
    }
}

async function getWeatherInfo(forecast:string, grid: string): Promise<weatherData>{

    
    try {
       let forecastData =  await axios.get(forecast);
       let gridData =  await axios.get(grid);

        let todayLog: weatherLog = {
            forecast: forecastData.data.properties.periods[0].shortForecast,
            temp: forecastData.data.properties.periods[0].temperature,
            location: {state: "", county: ""},
            humidity: gridData.data.properties.relativeHumidity.values[0].value
        };

          let tomorrowLog: weatherLog = {
            forecast: forecastData.data.properties.periods[1].shortForecast,
            temp: forecastData.data.properties.periods[1].temperature,
            location: {state: "", county: ""},
            humidity:  0
        };

        return {
            todayForecast: todayLog,
            tomorrowForecast: tomorrowLog
        }
        


    }catch(err:unknown){
        throw err
    }



}