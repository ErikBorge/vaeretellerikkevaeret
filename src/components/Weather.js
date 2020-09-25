import React from 'react';

const Weather = (props) => {
  const {name, icon, main, temp, wind} = props.weather;

  return (
    <div className="weather">
      <h1>{name}</h1>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/><br/>
      {main}<br/>
      {temp}°C<br/>
      {wind} m/s
    </div>
  );
}

export default Weather;
