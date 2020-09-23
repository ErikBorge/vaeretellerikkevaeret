import React from 'react';
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


const App = () => {
  return (
    <div>Yellow dis is App at top level yes.
      <Test/>
    </div>
  );
}

render(<App />,document.getElementById('root'));
