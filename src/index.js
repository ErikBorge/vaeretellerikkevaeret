import React, { useState, useEffect } from 'react';
import {render} from 'react-dom';

import Weather from './components/Weather';
import Frame from './components/Frame';
import Frame2 from './components/Frame2';
import './styles/index.scss';



const api = {
  key: "209d013b886466ecf743dce3799e8925",
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {

  // const [weather, setWeather] = useState({});
  const [weather, setWeather] = useState(
    JSON.parse(localStorage.getItem('weatherHistory')) || []
  );
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [errorLocation, setErrorLocation] = useState('');
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    localStorage.setItem('weatherHistory', JSON.stringify(weather));
    if(weather[0]){
      setShowSplashScreen(false);
      changeBackColor(weather[0]);

    };
    if(showSplashScreen) {
      enterSplashScreen(document.getElementById("splash-title"), document.getElementById("splash-field"));
    }

  });

  const getWeather = (loc) => {
    // console.log("getting weather");
    fetch(`${api.base}weather?q=${loc}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        (result.cod === "404") ? (
          setError(true),
          setErrorLocation(location) )
        : (
          // console.log(result),
          setWeather(updateWeather(result)),
          setLocation(''),
          setError(false)
          )
      })
  }
  const getKey = (e) => {
    if (e.key === 'Enter') {
      getWeather(location);
      if (showSplashScreen){
        removeSplashScreen();
      }
    }
  }

  const deconstructWeatherObject = (object) => {
    return {
      name: object.name,
      main: object.weather[0].main,
      temp: Math.round(object.main.temp),
      wind: object.wind.speed,
      icon: object.weather[0].icon,
      time: object.dt,
      timezone:object.timezone,
      sunrise: object.sys.sunrise,
      sunset: object.sys.sunset,
      clouds: object.clouds.all,
      rain: object.rain ? object.rain['1h'] : 0,
    }
  }

  const updateWeather = (element) => {
    // make editable copy of weather
    // console.log(element);
    let newWeather = Object.assign([], weather);
    let newElement = deconstructWeatherObject(element)
    // console.log(newElement);
    // check if element is already in history
    newWeather.map((value, key) => {
      if (value.name === newElement.name) {
        newWeather.splice(key,1);
      }
    })

    // add element to newWeather
    newWeather.unshift(newElement);
    // setWeather(oldWeather => [deconstructWeatherObject(element), ...oldWeather]);

    // remove the last element when newWeather is filled up
    if (newWeather.length >= 5) {
      newWeather.pop();
      // setWeather(oldWeather => [ oldWeather[0], oldWeather[1], oldWeather[2], oldWeather[3] ])
    }

    changeBackColor(newElement);

    // finally, return newWeather for update
    return newWeather;
  }

  const changeBackColor = (weather) => {
    const element = document.getElementById("app");
    const sky = weather.main;

    // clear the classList of classes and adding app again
    element.classList.remove(...element.classList);
    element.classList.add("app");

    //add the appropriate class for the weather in question
    (sky === "Clear") ? element.classList.add("clear")
    : (sky === "Clouds") ? element.classList.add("clouds")
    : (sky === "Rain") ? element.classList.add("rain")
    : console.log(`The weather doesn't match any condition. It's ${sky}`);

    //If there's night
    if (weather.sunrise >= weather.time || weather.time >= weather.sunset) {
      element.classList.add("night");
    }

    // we also have Thunderstorm, Drizzle, Snow, Mist, Smoke, Haze, Dust, Fog, Sand, Dust, Ash, Squall, Tornado
    // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  }

  const enterSplashScreen = (element, field) => {
    element.style.paddingTop = "50%";
    setTimeout(() => {
      field.style.opacity = 1;
    }, 1000)
  }

  const removeSplashScreen = () => {
    const element = document.getElementById("splash");
    element.style.opacity=0;
    setTimeout(() => {
      element.style.display= "none"
      setShowSplashScreen(false);
    }, 1000)
  }

  return (
    <div id="app" className="app">
      { showSplashScreen ?
        <div id="splash" className="app__splashscreen">
          <div className="app__splashscreen-wrapper">
            <div id="splash-title" className="app__splashscreen-title">
              <h1>Vær og vær vær</h1>
              <h2>[væ:r å: væ:r væ:r] trøndersk uttrykk</h2>
              <input
                id="splash-field"
                type="text"
                className="app__search-field splash-field"
                placeholder="Hvor ille er været i..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                onKeyPress={e => getKey(e)}
              />
            </div>
          </div>
        </div>
        : null
      }

      <div className="app__wrapper">

        <input
          type="text"
          className="app__search-field"
          placeholder="Oslo, Paris..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={e => getKey(e)}
        />
        { weather && weather[0] && weather[0].name ?
          <Weather weather={weather[0]}/>

        : <div style={{minHeight: '300px', marginTop: '50px'}}>make a search to see some weather!</div> }
        { weather.length > 1 ?

        <div className="app__history">
          <h2>Siste søk</h2>
          <div className="app__history-content">
            { weather.length > 0 ?
              weather.map((element, key) => {
                if (key === 0){ return null }
                return (
                  <div key={key} onClick={() => getWeather(element.name)} className="app__history-element">
                    <div className="app__history-element-info">
                      <h1>{element.temp} °</h1>
                      <h1>{element.name}</h1>
                    </div>
                  </div>
                )
              })
              : null
            }
          </div>
        </div>
        : null }
        { error ?
          <span>Sorry, I couldn't find {errorLocation}...</span>
          : null }
      </div>
      {/*<Frame2 />*/}
    </div>
  );
}

render(<App />,document.getElementById('root'));

// import _ from 'lodash';
//
// function component() {
//   const element = document.createElement('div');
//
//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//
//   return element;
// }
//
// document.body.appendChild(component());
