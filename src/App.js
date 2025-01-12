import { useEffect, useState } from 'react'
import './App.css'
import searchicon from './assets/searchicon.png'
import sun_icon from './assets/sunicon.png'
import humidityicon from './assets/humidityGift.gif'
import windicon from './assets/WindGift.gif'
import nighticon from './assets/night.png'
import fewcloudicon from './assets/fewcloud.png'
import cloudsicon from './assets/clouds.png'
import snowicon from './assets/snow.png'
const WeatherApp = ({icon, temp, city, country, lat, log, humidity, wind}) => {
  return (
    <>
  <div className='image'>
    <img src={icon} alt="Image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
     <span className="lat">latitudde </span>
     <span>{lat}</span>
    </div>
    <div>
     <span className="log">londitude </span>
     <span>{log}</span>
    </div>
  </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityicon} alt="humidity" className="icon" />
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windicon} alt="wind" className="icon" />
        <div className="data">
          <div className="wind-percent">{wind} k/hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </>
  )

};


function App() {
  let api_key = "42f13a4bac2d53e9e2bac034a03870bb";
  // console.log("Running");
  const[text, setText] = useState("Chennai")
  const [icon, setIcon ] = useState(sun_icon);
  const [temp, setTemp ] = useState(0);
  const [city, setCity ] = useState("Chennai");
  const [country, setCountry ] = useState("IN");
  const [lat, setLat ] = useState(0);
  const [log, setLog ] = useState(0);
  const [humidity, setHumidity ] = useState(0);
  const [wind, setWind ] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIconMap = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": fewcloudicon,
    "02n": fewcloudicon,
    "03d": cloudsicon,
    "03n": cloudsicon,
    "04d": sun_icon,
    "04n": sun_icon,
    "09d":sun_icon,
    "04n": sun_icon,
    "13d" : snowicon,
    "13n": snowicon,
  };

  const search = async () =>{
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      //console.log(data);
      if(data.cod == "404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || sun_icon);
    setCityNotFound(false);

    }catch(error){
      console.error("An error occurred: ",error.message);
    }finally{
      setLoading(false);
    }
  }
  
  const handleCity = (e) =>{
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if(e.key == "Enter"){
      search();
    }
  };
  useEffect(function(){
    search();
  },[]);
  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" 
          className='cityInput' 
          placeholder='Search City' 
          onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={() => search()}>
          <img src={searchicon} alt="Search" width={"20px"}  height={"20px"}/>
          </div>
        </div>
        <WeatherApp icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
        <p className="copyright">Designed by @<span>Saran</span></p>
      </div>
    </>
  )
}

export default App
