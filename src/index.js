import React, { useState, useEffect } from 'react';
import {render} from 'react-dom';

import './styles/index.scss';

const api = {
  key: "209d013b886466ecf743dce3799e8925",
  base: "http://api.openweathermap.org/data/2.5/"
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
    console.log("updated local storage");
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
            console.log("setting weather"),
            setWeather(updateWeather(result)),
            setLocation(''),
            setError(false) )
        })
    }
  }

  const deconstructWeatherObject = (object) => {
    return {
      name: object.name,
      main: object.weather[0].main,
      temp: object.main.temp,
      wind: object.wind.speed,
      icon: object.weather[0].icon
    }
  }

  const updateWeather = (element) => {
    // make editable copy of weather
    console.log(element);
    let newWeather = weather;
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
      console.log("too long. poppin'");
      newWeather.pop();
      // setWeather(oldWeather => [ oldWeather[0], oldWeather[1], oldWeather[2], oldWeather[3] ])
    }

    // finally, return newWeather for update
    return newWeather;
  }

  // const getWeatherFromHistory = () => {
  //   return (history[0]) ?
  //     setWeather(history[0])
  //     : <div>make a search to see some weather!</div>
  // }

  return (
    <div>
      <div className="app"></div>
        <input
          type="text"
          className="search-field"
          placeholder="Oslo, Paris..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={e => getWeather(e)}
        />
      { weather && weather[0] && weather[0].name ?
        <div>
          <span><b>{weather[0].name}</b><br/>
          <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt=""/><br/>
          {weather[0].main}<br/>
          {weather[0].temp}°C<br/>
          {weather[0].wind} m/s
          </span>
        </div>
      : <div>make a search to see some weather!</div> }

      { weather.length > 0 ?
        weather.map((element, key) => {
          if (key === 0){ return null }
          return <div key={key}><br/>{element.name}<br/></div>
        })
        : null
      }
      { error ?
        <span>Sorry, I couldn't find {errorLocation}...</span>
        : null }
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
