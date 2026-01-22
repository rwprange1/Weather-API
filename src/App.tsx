import {  useRef, useState } from "react";
import { getWeatherData } from "./api";
import type { weatherData } from "./global";
import { DotLoader } from "react-spinners";

import WeatherData from "./Components/WeatherData";

import cloud from './assets/cloudy.jpg';
import sunny from './assets/sunny.jpg';
import clear from './assets/clear.jpg';
import rainy from './assets/rainy.png'

const map: Map<number, string> = new Map();
map.set(0, clear);
map.set(1, cloud);
map.set(2, sunny);
map.set(3, rainy);






function App() {
  const bg = useRef<HTMLDivElement>(null);
 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allowLocation, setAllowLocation] = useState<boolean>(false);
  const [weatherData ,setWeatherData] = useState<weatherData|undefined>();

  return (
    <div className="flex bg-blue-100 h-screen justify-center  items-center">


      <div className="flex flex-col w-1/3 h-1/2   rounded-2xl m-2 border-2 border-neutral-500">
        <header className="w-full h-1/8 p-1">
          <nav className="flex p-2 h-full items-center justify-between ">
              <div className="text-center font-bold text-nuetral-500 text-neutral-800">
                <h2 > WEATHER.EXE</h2>
              </div>
          
            <div className="flex flex-row gap-2 h-full items-center">
              <button className="bg-green-400 rounded-full text-center p-2 max-w-1/3 border border-neutral-500" >  </button>
              <button className="bg-yellow-200 rounded-full text-center p-2 max-w-1/3 border border-neutral-500 "> </button>
              
              <button className="bg-red-500 rounded-full text-center p-2 max-w-1/3 border border-neutral-500"> </button>
            </div>
          </nav>
        </header>

           
        <div ref={bg} className="flex border-2 bg-[url(./assets/clear.jpg)] bg-contain border-neutral-700 rounded-2xl ml-2 mr-2 p-1 h-4/5 -mt-1">

              {   
                  !allowLocation ?
                  <div className="flex flex-row justify-center self-center items-center   h-full w-full">
                    <button className="border-neutral-400 p-1 bg-neutral-200 rounded-xl text-yellow-400 font-bold " onClick={fetchWeather}>Allow Location</button>
                  </div>
                  : 
                  isLoading ? 
                  <div className="flex flex-col justify-center self-center items-center   h-full w-full">
                    <DotLoader />
                    <h2>Fetching Data</h2>
                  </div> : weatherData &&          
                  <WeatherData data={weatherData} ></WeatherData>
              }


              
              
              
             

        
        </div>

      </div>

      
      




    </div>
   
  );

  async function fetchWeather(){
    if ("geolocation" in navigator){
      console.log("click")
        setIsLoading(true);
        setAllowLocation(true);
        setTimeout(() => {
          console.log("Waiting");
      }, 3000);
      navigator.geolocation.getCurrentPosition((pos) => {
        
        
        getWeatherData(pos.coords.longitude, pos.coords.latitude).then((data:weatherData) => {
          setWeatherData(data);
          if (bg.current){
            let val = 0;
            data.todayForecast.forecast = "sunny";
            
            if (data.todayForecast.forecast.includes("sunny")){
              val =2
            } else if (data.todayForecast.forecast.includes("cloudy")){
               val = 1;
            }else if (data.todayForecast.forecast.includes("rainy")){
              val = 3;
            }
            bg.current.style.backgroundImage = `url('${map.get(val)}')`
          } 
         

        }).catch((_) => {
          alert("There was an API error")
        }).finally(()=> {
           
          setIsLoading(false);
        });

        

        
      });
   

    }else{
      alert("An error occured, please reload the page");
    }
  }






}

export default App
