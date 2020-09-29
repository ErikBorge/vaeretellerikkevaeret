import React, { useState, useEffect } from 'react';

import Frame from './Frame';

import WindIcon from '../assets/wind.svg';
// import RandomShape from '../assets/randomshape.svg';

// import flatten from 'lodash-es/flatten'
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
// // potensielt hente paths fra svg (med imports rett over)
// const svgResource = new Promise(resolve =>
//   windsvg = new SVGLoader().load(WindIcon, shapes => {
//     console.log(shapes);
//     shapes.paths.map(element => {
//       element.color.b = 255;
//       element.color.g = 255;
//       element.color.r = 255;
//     })
//
//   }
//
//     // resolve(flatten(shapes.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
//   )
// )

const Weather = (props) => {
  const [mainStatement, setMainStatement] = useState('');
  const [sideStatement, setSideStatement] = useState('');
  const [quote, setQuote] = useState('');


  useEffect(() => {
    generateStatement();
    changeSVGColor();
    // console.log(sideStatement);
    // const svg = document.getElementById("randomshapepath");
    // console.log(svg);
  });

  const {name, icon, main, temp, wind, clouds, rain, time, timezone} = props.weather;
  const hour = new Date((time+timezone) * 1000).getUTCHours();
  // const index = props.index;
  const phrases = ['Ikke så verst.', 'Helt OK.', 'Litt kjipt.', 'Ganske kjipt.', 'Helt jævlig.', 'Ikke tenk på å gå ut en gang.'];
  const windStatements = [0, 'litt vind', 'noe vind', 'en del vind', 'ganske mye vind', 'helt sinnssykt mye vind'];
  const rainStatements = [0, 'nesten ikke regn', 'vanlig-jakkeregn', 'regnjakkeregn', 'paraplyregn', 'støvleregn' ];
  const goodWeatherQuotes = ['Nå kan det bare gå nedover.', 'Kunne vært vær, si!', 'Været slår nok tilbake snart.', 'Ikke se for lyst på det. Det blir verre.'];
  const badWeatherQuotes = ['Ah mah gaaad!', 'I dag igjen...', 'Æsj ass.', 'Blir aldri bra dette.', 'Når blir det sommer igjen?'];
  // const [index, setIndex] = useState(Math.round(Math.random() * 5));
  // const index = Math.round(Math.random() * phrases.length)

  const generateStatement = () => {
    const windIndex = Math.min(
      Math.round((wind/10)*windStatements.length),
      windStatements.length )
    const rainIndex = Math.min(
      Math.round((rain/10)*windStatements.length),
      rainStatements.length )
    const phraseIndex = Math.round((windIndex+rainIndex)/2);
    // console.log(phraseIndex);
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
    // console.log(windRainStatement);

    // if (phraseIndex < phrases.length/2) { setQuote(goodWeatherQuotes[index]) }
    // else { setQuote(badWeatherQuotes[index]) };

    return phraseIndex;
  }
  const changeSVGColor = () =>{

  }
  // console.log(window.innerWidth);
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
                <h2>{quote}</h2>
              </div>

              <div className="weather__info-specs">
                {/*<div style={{display: "flex"}}>
                  <img width="30px" src={WindIcon} alt=""/>*/}
                  <h2>{temp}°</h2>
                {/*</div>*/}
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
                <Frame weather={main}/>
              </div>
              <div className="weather__info-specs">
                <h2>{temp}°</h2>
                <h2>{Math.round(wind)} m/s</h2>
                <h2>{Math.round(rain)} mm</h2>
              </div>
            </div>
          </>
        }
    </div>
  );
}

export default Weather;


// frase. regn og vind
//ikke så verst. litt regn og litt vind.
//helt jævlig. masse regn og masse vind.
//ganske kjipt. masse regn.
//ganske kjipt. masse vind.
