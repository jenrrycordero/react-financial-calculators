import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

(function(window){
    const _init = ({
        selector     = 'vtMvsBCalc',
        lan          = 'en',
        btnLabel     ='Calculate'
    })=>{
        let calculator = (<App lan={lan} btnLabel={btnLabel} />);
        ReactDOM.render( calculator, document.getElementById(selector) );
    }

    window.VTMonthlyVsBiweeklyCalculator = { init: _init }
})(window);
//ReactDOM.render(<App lan='en' btnLabel='Calculate' />, document.getElementById('root'));

serviceWorker.unregister();