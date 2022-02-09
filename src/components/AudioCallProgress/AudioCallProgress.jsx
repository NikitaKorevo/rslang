import React, { useEffect } from 'react';
import './AudioCallProgress.scss';

function AudioCallProgress() {
  useEffect(() => {
    async function getData() {
      const response = await fetch('https://rslang-react-app.herokuapp.com/words?page=1&group=0');
      const data = await response.json();
      console.log('asdf');
      console.log(data);
    }
    getData();
  });

  return <h2>AudioCallProgress123</h2>;
}

export default AudioCallProgress;
