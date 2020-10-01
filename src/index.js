import React, { useState, useEffect } from 'react';
import {render} from 'react-dom';

import Weather from './components/Weather';
import LaserCat from './components/bits/LaserCat';
import './styles/index.scss';

import CrossIcon from './assets/cross-icon.svg';

// TODO: This should obviously not be included here...
const api = {
  key: '209d013b886466ecf743dce3799e8925',
  base: "https://api.openweathermap.org/data/2.5/"
}

const secretWords = [
  'laser', 'cat', 'laser cat', 'lilbub',
  'canihascheeseburger', 'cheeseburger', 'lolcat',
  'konami', 'rosebud', 'howdoyouturnthison',
  'asdf'];

const App = () => {

  // States
  const [weather, setWeather] = useState(
    JSON.parse(localStorage.getItem('weatherHistory')) || []
  );
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [errorLocation, setErrorLocation] = useState('');
  const [showSplashScreen, setShowSplashScreen] = useState(!weather[0]);
  const [hasCheeseBurger, setHasCheeseBurger] = useState(false); //Laser cat

  useEffect(() => {
    //Update local storage with new weather data
    localStorage.setItem('weatherHistory', JSON.stringify(weather))
    //Change background color only if we have some weather
    weather[0] && changeBackColor(weather[0]);
    //Start splashscreen if we don't have any weather
    showSplashScreen && enterSplashScreen(document.getElementById("splash-title"), document.getElementById("splash-field"));
    //Attach onclicks to all elements in lazer cat mode
  });

  //Get weather from API and put the result in weather
  const getWeather = (loc) => {
    // If you write some secret word
    if(secretWords.includes(loc.toLowerCase())) {
      setHasCheeseBurger(true);
    }
    else{
      fetch(`${api.base}weather?q=${loc}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          (result.cod === "404") ? (
            setError(true),
            setErrorLocation(location),
            setLocation('')
          )
          : (
            setWeather(updateWeather(result)),
            setLocation(''),
            setError(false)
            )
        })
    }
  }

  //Only do a search when the user presses 'Enter'. Remove splashscreen if present
  const getKey = (e) => {
    if (e.key === 'Enter') {
      getWeather(location);
      (showSplashScreen) && removeSplashScreen();
      e.target.blur();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  //deconstruct the result from the API into a new object
  const deconstructWeatherObject = (object) => {
    return {
      name: object.name,
      main: object.weather[0].main,
      temp: object.main.temp,
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
    let newWeather = Object.assign([], weather);
    let newElement = deconstructWeatherObject(element)

    // check if element is already in history
    newWeather.forEach((value, key) => {
      (value.name === newElement.name) && newWeather.splice(key,1);
    })

    // add element to newWeather
    newWeather.unshift(newElement);

    // remove the last element when newWeather is filled up
    newWeather.length >= 5 && newWeather.pop();

    // finally, return newWeather for update
    return newWeather;
  }

  //change background color based on weather
  // TODO: some times the API gives main: Rain, while there's actually 0mm rain the next hour.
  // Calculate color based on forecasted rain and amount of clouds instead?
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
    : (sky === "Mist") ? element.classList.add("clouds")
    : console.log(`The weather doesn't match any condition. It's ${sky}`);

    //If there's night
    (weather.sunrise >= weather.time || weather.time >= weather.sunset) && element.classList.add("night");

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

  const removeErrorMsg = () => {
    setError(!error);
  }

  return (
    <div id="app" className="app">
      { showSplashScreen &&
        <div id="splash" className="app__splashscreen">
          <div className="app__splashscreen-wrapper">
            <div id="splash-title" className="app__splashscreen-title">
              <h1>Vær og vær vær</h1>
              <h2>[væ:r å: væ:r væ:r], trøndersk uttrykk</h2>
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
      }

      <div className="app__wrapper">
        <input
          id="search-field"
          type="text"
          className="app__search-field"
          placeholder="Oslo, Paris..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={e => getKey(e)}
        />
        { weather[0] && weather[0].name ?
          <Weather weather={weather[0]}/>
        : <div style={{minHeight: '300px', marginTop: '50px'}}>make a search to see some weather!</div> }
        { weather.length > 1 &&
          <div className="app__history">
            <h2>Siste søk</h2>
            <div className="app__history-content">
              { weather.map((element, key) => {
                  if (key === 0) { return null }
                  return (
                    <div
                      className="app__history-element"
                      key={key}
                      onClick={(e) => {
                        getWeather(element.name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        e.currentTarget.blur();
                      }}
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          getWeather(element.name);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          e.target.blur();
                        }
                      }}
                    >
                      <div className="app__history-element-info">
                        <h1>{Math.round(element.temp)}°&nbsp;</h1>
                        <h1>{element.name}</h1>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        { error &&
          <div className="app__error">
            <span>Sorry ass, {errorLocation} finnes ikke... Prøv noe annet.</span>
            <img src={CrossIcon} alt="x" onClick={removeErrorMsg}/>
          </div>
          }
      </div>
      <LaserCat hasCheeseBurger={hasCheeseBurger}/>
    </div>
  );
}

render(<App />,document.getElementById('root'));
