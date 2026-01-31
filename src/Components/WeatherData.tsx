
import type { weatherData } from "../global"



interface weatherDataProps{
    data: weatherData;
}

export default function WeatherData(props: weatherDataProps ){


    
    let val = "Crimson";
    if (props.data.todayForecast.forecast.includes("sunny")){
        val = "#4A0404"
    } else if (props.data.todayForecast.forecast.includes("cloudy")){
        val = "#F0E68C";
    }else if (props.data.todayForecast.forecast.includes("rainy")){
        val = "#F5F5F5";
    } 

    


    return (
        <div style={{color: val}} className=" font-bold text-lg sm:text-xl md:text-2xl  flex flex-col items-start justify-between  w-full h-full">

            <div >
                    <h1>Today it is {props.data.todayForecast.forecast}</h1>
                    <h2>Humidity: {props.data.todayForecast.humidity}%</h2>
            </div>
          

            <div className="self-center text-4xl justify-center">{props.data.todayForecast.temp}&deg;F</div>

            <div >
                <h2 >Tomorrow's forecast: {props.data.tomorrowForecast.forecast} with a high of {props.data.tomorrowForecast.temp}&deg;F</h2>
                <h2>Recommendation: {fullRec(props.data.tomorrowForecast.forecast,props.data.todayForecast.temp )}</h2>    

            </div>

         
        </div>


    )



}



function fullRec(forecast:string, temperature: number){
    let rec = giveRecomendation(forecast);
    const forecastLower = forecast.toLowerCase();
    
    let additionalTips = [];
    
    // Temperature-based additions
    if (temperature !== null) {
        if (temperature > 90) {
            additionalTips.push('Drink plenty of water!');
        } else if (temperature > 80) {
            additionalTips.push('Stay hydrated');
        }else if (temperature > 40){
            additionalTips.push('Try to stay warm!');
        } else if (temperature < 32) {
            additionalTips.push('Watch for ice on walkways');
        } else if (temperature < 20) {
            additionalTips.push('Limit skin exposure to cold air');
        }
    }
    
   
   
    // Activity-specific recommendations
    if (forecastLower.includes('clear') || forecastLower.includes('sunny') || forecastLower.includes('fair')) {
        if (temperature !== null && temperature > 65 && temperature < 85) {
            additionalTips.push('Perfect for hiking or picnics!');
        }
    }
    
    if (forecastLower.includes('rain') && !forecastLower.includes('freezing')) {
        additionalTips.push('Good day for museums or indoor activities');
    }
    
    if (forecastLower.includes('snow') && temperature !== null && temperature < 32) {
        additionalTips.push('Great conditions for winter sports!');
    }
    
    // Combine recommendations
    if (additionalTips.length > 0) {
        return `${rec} ${additionalTips.join(' ')}`;
    }
    
    return rec;
}

function giveRecomendation(forecast:string){

     const recommendations = {
        // Extreme weather - stay inside
        'tornado': 'Seek shelter immediately! Stay indoors away from windows.',
        'freezing rain': 'Stay inside if possible. Roads are extremely hazardous.',
        'freezing rain and snow': 'Stay inside if possible. Roads are extremely hazardous.',
        'wind chill down to -': 'Extreme cold - minimize outdoor exposure.',
        'heat index up to 1': 'Extreme heat - stay in air conditioning if possible.',
        'very cold': 'Extreme cold - minimize outdoor exposure.',
        'very hot': 'Extreme heat - stay in air conditioning if possible.',
        
        // Rain-related
        'rain': 'Bring an umbrella and wear waterproof shoes.',
        'rain likely': 'Bring an umbrella and wear waterproof shoes.',
        'chance of rain': 'Might want to carry an umbrella just in case.',
        'showers likely': 'Pack an umbrella - showers are expected.',
        'chance showers': 'Consider bringing an umbrella.',
        'isolated showers': 'Might want an umbrella for isolated showers.',
        'scattered showers': 'Keep an umbrella handy for scattered showers.',
        'showery or intermittent': 'Intermittent showers - keep rain gear handy.',
        
        // Snow-related
        'snow': 'Wear warm layers, boots, and be careful driving.',
        'snow likely': 'Wear warm layers, boots, and be careful driving.',
        'chance of snow': 'Dress warmly and watch for icy patches.',
        'snow showers': 'Bundle up! Snow showers expected.',
        
        // Mixed precipitation
        'mix': 'Mixed precipitation - dress warmly and wear waterproof shoes.',
        'sleet': 'Sleet expected - roads will be slippery, wear boots.',
        'rain and sleet': 'Rain and sleet - very slippery conditions.',
        'chance of snow and rain': 'Could be wet and chilly - dress in layers.',
        'rain and snow': 'Rain and snow mix - wear waterproof warm clothing.',
        'rain or snow': 'Be prepared for either rain or snow.',
        
        // Temperature extremes
        'hot': 'Stay hydrated, wear light clothing, and avoid strenuous activity.',
        'cold': 'Bundle up with multiple layers and limit time outside.',
        
        // Fog
        'fog': 'Drive carefully with low beams, allow extra travel time.',
        'fog in the morning': 'Morning fog expected - allow extra commute time.',
        'fog after midnight': 'Evening fog possible - drive carefully.',
        
        // Cloud conditions
        'clear': 'Perfect day for outdoor activities!',
        'sunny': 'Great day to be outside! Wear sunscreen.',
        'fair': 'Nice day ahead!',
        'mostly clear': 'Pleasant weather for outdoor activities.',
        'mostly sunny': 'Great day to be outside!',
        'partly sunny': 'Good day for outdoor plans.',
        'mostly sunny and breezy': 'Windy but sunny - hold onto your hat!',
        'partly sunny and windy': 'Windy with some sun - secure loose items.',
        'partly sunny and breezy': 'Breezy with partial sun - pleasant!',
        'mostly sunny and windy': 'Windy but mostly sunny.',
        
        // Cloudy
        'cloudy': 'Overcast but dry - normal day.',
        'mostly cloudy': 'Mostly cloudy but no rain expected.',
        'partly cloudy': 'Mix of sun and clouds.',
        'overcast': 'Gray day but dry - indoor activities might be nice.',
        
        // Windy
        'windy': 'Windy day - secure outdoor items.',
        
        // Thunder
        'thunder possible': 'Thunder possible - have indoor backup plans.',
        'thunder storm': 'Thunderstorm expected - stay indoors if possible.',
        'thunder|tsra|ntsra': 'Thunderstorms likely - postpone outdoor activities.',
    };

    // Convert input to lowercase for case-insensitive matching
    const forecastLower = forecast.toLowerCase();
    
    // Check for severe weather keywords
    const severeKeywords = ['tornado', 'freezing', 'thunder', 'hail', 'blizzard'];
    for (const keyword of severeKeywords) {
        if (forecastLower.includes(keyword)) {
            return `Severe weather (${keyword}) - take precautions and stay informed.`;
        }
    }

    // Find the best matching key
    for (const [key, recommendation] of Object.entries(recommendations)) {
        if (forecastLower.includes(key.toLowerCase())) {
            return recommendation;
        }
    }
    
    
    
    // Default fallback
    return `Weather: ${forecast}. Have a good day!`;

}



