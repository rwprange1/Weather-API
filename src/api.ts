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
                "forcast" : response.data.properties.forecast,
                "county": response.data.properties.county,
                "grid": response.data.properties.forecastGridData

            };
            console.log(JSON.stringify(dict));
            let location: location = await getLocation(dict.county);
            let weatherInfo: weatherData = await getWeatherInfo(dict.forcast, dict.grid);
            
            weatherInfo.todayForcast.location = location;
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
       let forcastData =  await axios.get(forecast);
       let gridData =  await axios.get(grid);

        let todayLog: weatherLog = {
            forcast: forcastData.data.properties.periods[0].shortForecast,
            temp: forcastData.data.properties.periods[0].temperature,
            location: {state: "", county: ""},
            humidity: gridData.data.properties.relativeHumidity.values[0].value
        };

          let tomorrowLog: weatherLog = {
            forcast: forcastData.data.properties.periods[1].shortForecast,
            temp: forcastData.data.properties.periods[1].temperature,
            location: {state: "", county: ""},
            humidity:  0
        };

        return {
            todayForcast: todayLog,
            tomorrowForcast: tomorrowLog
        }
        


    }catch(err:unknown){
        throw err
    }



}