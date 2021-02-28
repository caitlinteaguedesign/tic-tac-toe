import React from 'react';
import ReactDOM from 'react-dom';

// visual components
import {Description} from './components/description';
import {Game} from './components/game';

// styles
import './css/styles.min.css?v=1';
import './css/styles.min.css.map?v=1';

// ========================================

ReactDOM.render(
  <Description />,
  document.getElementById('heading')
);

ReactDOM.render(
  <Game />,
  document.getElementById('body')
);