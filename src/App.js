
import './App.css';
import Search from './components/search/Search';
import Currentweather from './components/search/currentWeather/Currentweather';
import { useState } from 'react';
import Background from './components/search/Background';
import Forecast from './components/forecast/Forecast';

function App() {

  const[currentWeather , setcurrentWeather] = useState(null);
  const[background , setbackground] = useState(null);
  const[forecast , setforecast] = useState(null); 

const handleOnSearchChange = (searchData) => {
  const [lat , lon] = searchData.value.split(" ");

  const currentWeatherFetch= fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=762def3d578165be4878d627a42a5017&units=metric`);
  const forecastFetch= fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=762def3d578165be4878d627a42a5017&units=metric`);

  Promise.all([currentWeatherFetch , forecastFetch])
  .then(async (response) => {
    const weatherResponse = await response[0].json();
    const forecastResponse = await response[1].json();

setcurrentWeather({ city : searchData.label , ...weatherResponse});
setbackground({ city : searchData.label , ...weatherResponse});
setforecast({city : searchData.label , ...forecastResponse});

  })
  .catch((err) => console.log(err));

}



  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange}/>
      { currentWeather &&<Currentweather  data={currentWeather}></Currentweather>}
    { currentWeather && <Background  data={background}> </Background>}
    {forecast &&<Forecast data={forecast}></Forecast>}
    </div>
  );
}

export default App;
