import React, { useState } from 'react';
import {render} from 'react-dom';

import Test from './components/Test';

import './styles/index.scss';

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
const api = {
  key: "209d013b886466ecf743dce3799e8925",
  base: "http://api.openweathermap.org/data/2.5/"
}


const App = () => {

  const [weather, setWeather] = useState({});
  const query = 'Oslo';

  const getWeather = () => {
    // if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result),
          console.log(result)
        });
    // }

  }
  return (
    <div>Yellow dis is App at top level yes.
    <div className="app"></div>
      <Test/>
      <button className="search" onClick={getWeather}>get weather</button>
    </div>
  );
}

render(<App />,document.getElementById('root'));
