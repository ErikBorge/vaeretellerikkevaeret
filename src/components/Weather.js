import React from 'react';

import Frame from './Frame';

const Weather = (props) => {
  const {name, icon, main, temp, wind} = props.weather;

  return (
    <div className="weather">
      <div className="weather__graphics">
        <Frame weather={main}/>
      </div>

      {/*<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/><br/>*/}
        <div className="weather__info">
          <h1>{temp}°</h1>
          <h2>{name}</h2>
          {/*<span>{Math.round(wind*10)/10} m/s</span>*/}
        </div>

    </div>
  );
}

export default Weather;
