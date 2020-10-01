import React, { useState, useEffect } from 'react';

import Frame from './Frame';

const Weather = (props) => {
  const [mainStatement, setMainStatement] = useState('');
  const [sideStatement, setSideStatement] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    generateStatement();
  });

  const {name, icon, main, temp, wind, clouds, rain, time, timezone} = props.weather;
  const hour = new Date((time+timezone) * 1000).getUTCHours();

  const phrases = ['Ikke så ille.', 'Ikke verst.', 'Helt OK.', 'Kunne vært bedre.', 'Litt kjipt.', 'Ganske kjipt.', 'Helt jævlig.', 'Ikke gå ut.'];
  const windStatements = [0, 'litt vind', 'noe vind', 'en del vind', 'ganske mye vind', 'helt sinnssykt mye vind'];
  const rainStatements = [0, 'nesten ikke regn', 'vanlig-jakkeregn', 'regnjakkeregn', 'paraplyregn', 'støvleregn' ];
  const goodWeatherQuotes = ['Nå kan det bare gå nedover.', 'Kunne vært vær, si!', 'Været slår nok tilbake snart.', 'Ikke se for lyst på det. Det blir verre.'];
  const badWeatherQuotes = ['Ah mah gaaad!', 'I dag igjen...', 'Æsj ass.', 'Blir aldri bra dette.', 'Når blir det sommer igjen?'];

  const generateStatement = () => {
    const windIndex = Math.min(
      Math.round(Math.min((wind/10)*windStatements.length, windStatements.length-1)),
      windStatements.length )
    const rainIndex = Math.min(
      Math.round(Math.min((rain/10)*windStatements.length, windStatements.length)),
      rainStatements.length )
    const phraseIndex = Math.round((windIndex+rainIndex)/2);

    var windRainStatement;
    if (windIndex === 0 && rainIndex === 0){ windRainStatement = '' }
    else if (rainIndex === 0 && windIndex != 0){
      windRainStatement = windStatements[windIndex].charAt(0).toUpperCase() + windStatements[windIndex].slice(1) + '.'
    }
    else if (windIndex === 0 && rainIndex != 0) {
      windRainStatement = rainStatements[rainIndex].charAt(0).toUpperCase() + rainStatements[rainIndex].slice(1) + '.'
    }
    else {
      windRainStatement = `${windStatements[windIndex].charAt(0).toUpperCase() + windStatements[windIndex].slice(1)} og ${rainStatements[rainIndex]}.`
    }

    setMainStatement(phrases[phraseIndex]);
    setSideStatement(windRainStatement);

    return phraseIndex;
  }

  return (
    <div className="weather">
      {/*<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/><br/>*/}
        {window.innerWidth > 768 ?
          <>
            <div className="weather__info">
              <div className="weather__info-top">
                <h2 style={{paddingBottom: '50px'}}>{name} kl {hour}</h2>
                <h1>{mainStatement}</h1>
                <h2>{sideStatement}</h2>

              </div>

              <div className="weather__info-specs">
                <h2>{Math.round(temp)}°</h2>
                <h2>{Math.round(wind)} m/s</h2>
                <h2>{Math.round(rain*10)/10} mm</h2>
              </div>
            </div>
            <div className="weather__info-graphics">
              <Frame weather={props.weather}/>
            </div>
          </>
          :
          <>
            <div className="weather__info">
              <div className="weather__info-top">
                <h2 style={{paddingBottom: '50px'}}>{name} kl {hour}</h2>
                <h1>{mainStatement}</h1>
                <h2>{sideStatement}</h2>
                <h2>{quote}</h2>
              </div>
              <div className="weather__info-graphics">
                <Frame weather={props.weather}/>
              </div>
              <div className="weather__info-specs">
                <h2>{Math.round(temp)}°</h2>
                <h2>{Math.round(wind)} m/s</h2>
                <h2>{Math.round(rain*10)/10} mm</h2>
              </div>
            </div>
          </>
        }
    </div>
  );
}

export default Weather;
