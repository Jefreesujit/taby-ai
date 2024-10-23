import React from 'react';
import ReactDOM from 'react-dom';
import Options from './components/OptionScreen';

const optionsRoot = document.getElementById('options-root');

// Render our React App
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  optionsRoot
);
