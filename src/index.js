import React, { useState, useEffect } from 'react';
import {render} from 'react-dom';

import Weather from './components/Weather';
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

  useEffect(() => {
    localStorage.setItem('weatherHistory', JSON.stringify(weather));
    changeBackColor(weather[0].main);
  });

  const getWeather = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          (result.cod === "404") ? (
            setError(true),
            setErrorLocation(location) )
          : (
            setWeather(updateWeather(result)),
            setLocation(''),
            setError(false)
            )
        })
    }
  }

  const deconstructWeatherObject = (object) => {
    return {
      name: object.name,
      main: object.weather[0].main,
      temp: Math.round(object.main.temp),
      wind: object.wind.speed,
      icon: object.weather[0].icon
    }
  }

  const updateWeather = (element) => {
    // make editable copy of weather
    // console.log(element);
    let newWeather = Object.assign([], weather);
    let newElement = deconstructWeatherObject(element)

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

    // finally, return newWeather for update
    return newWeather;
  }

  const changeBackColor = (sky) => {
    const element = document.getElementById("app");

    if (element.classList.length > 0) { element.classList.remove(element.classList[1]) };

    (sky === "Clear") ? element.classList.add("clear")
    : (sky === "Clouds") ? element.classList.add("clouds")
    : (sky === "Rain") ? element.classList.add("rain")
    : console.log(`The weather doesn't match any condition. It's ${sky}`)
  }

  return (
    <div id="app" className="app">
      <div className="app__wrapper">
        <input
          type="text"
          className="app__search-field"
          placeholder="Oslo, Paris..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={e => getWeather(e)}
        />
        { weather && weather[0] && weather[0].name ?
          <Weather weather={weather[0]}/>

        : <div>make a search to see some weather!</div> }
        <div className="app__history">
          { weather.length > 0 ?
            weather.map((element, key) => {
              if (key === 0){ return null }
              return (
                <div key={key} className="app__history-element">
                  <h3>{element.name}&nbsp;&nbsp;</h3>
                  <h1>{element.temp}°C</h1>
                </div>
              )
            })
            : null
          }
        </div>
        { error ?
          <span>Sorry, I couldn't find {errorLocation}...</span>
          : null }
      </div>
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
