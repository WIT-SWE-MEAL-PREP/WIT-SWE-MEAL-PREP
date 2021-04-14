import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

const PORT = process.env.PORT || 3000

ReactDOM.render( <
    App / > ,

    document.getElementById('root')
);


//app.listen(PORT, () => console.log(`App running on port ${PORT}`))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();