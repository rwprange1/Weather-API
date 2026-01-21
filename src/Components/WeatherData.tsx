
import type { weatherData } from "../global"



interface weatherDataProps{
    data: weatherData;
}

export default function WeatherData(props: weatherDataProps ){


    
    let val = "Crimson";
    if (props.data.todayForcast.forcast.includes("sunny")){
        val = "DarkBlue"
    } else if (props.data.todayForcast.forcast.includes("cloudy")){
        val = "Red";
    }else if (props.data.todayForcast.forcast.includes("rainy")){
        val = "White";
    } 

    


    return (
        <div style={{color: val}} className=" font-bold text-lg md:text-xl flex flex-col items-start self-start justify-start gap-2 w-full h-full">

            <h1 className="text-2xl">Today it is {props.data.todayForcast.forcast}</h1>
            <h2 className="mb-6">Humidity {props.data.todayForcast.humidity}%</h2>

            <div className="self-center text-3xl justify-center m-10">{props.data.todayForcast.temp}&deg;F</div>

            <h2 className="mt-6">Tomorrow's forecast: {props.data.tomorrowForcast.forcast} with a high of {props.data.tomorrowForcast.temp}&deg;F</h2>
            <h2>Recommendation: IDK BRO</h2>    
        </div>


    )



}




/** 
 * 
 * implement a recomendation based on these inputs and temps
tornado
showery or intermittent
thunder possible
thunder|tsra|ntsra|Thunder storm|
rain and sleet|raip|nraip|Rain Sleet|
freezing rain and snow|fzra_sn|nfzra_sn|FrzgRn Snow|
snow and freezing rain|fzra_sn|nfzra_sn|FrzgRn Snow|
chance of snow and rain|rasn|nrasn|Chance Snow/Rain|
chance of rain and snow|rasn|nrasn|Chance Snow/Rain|
rain and snow|rasn|nrasn|Rain and Snow|
rain or snow|rasn|nrasn|Rain or Snow|
freezing rain|fzra|fzra|Freezing Rain|
rain likely|ra|nra|Rain likely|
snow showers|sn|nsn|Snow showers|
showers likely|shra|nshra|Showers likely|
chance showers|shra|nshra|Chance showers|
isolated showers|shra|nshra|Isolated showers|
scattered showers|shra|nshra|Scattered showers|
chance of rain|ra|nra|Chance rain|
rain|ra|nra|Rain|
mix|rasn|rasn|Mix|
sleet|ip|nip|Sleet|
snow|sn|nsn|Snow|
fog in the morning|sctfg|nbknfg|Fog a.m.|
fog after midnight|sctfg|nbknfg|Fog late|
fog|fg|nfg|Fog|
wind chill down to -|cold|cold|Very Cold|
heat index up to 1|hot|hot|Very Hot|
hot|hot|hot|Hot|
overcast|ovc|novc|Overcast|
mostly cloudy|bkn|nbkn|Mostly Cloudy|
partly cloudy|sct|nsct|Partly Cloudy|
cloudy|cloudy|ncloudy|Cloudy|
partly sunny and windy|wind_sct|nwind_sct|Partly Sunny|
mostly sunny and windy|wind_few|nwind_few|Mostly Sunny|
partly sunny and breezy|wind_sct|nwind_sct|Partly Sunny|
mostly sunny and breezy|wind_few|nwind_few|Mostly Sunny|
partly sunny|sct|nsct|Partly Sunny|
mostly sunny|few|nfew|Mostly Sunny|
mostly clear|few|nfew|Mostly Clear|
sunny|skc|nskc|Sunny|
clear|skc|nskc|Clear|
fair|few|nfew|Fair|
cloud|bkn|nbkn|Variable Clouds|
*/