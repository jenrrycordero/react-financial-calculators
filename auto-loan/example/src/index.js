import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


// /*
(function(window){
    const _init = ({
                       selector     = 'vtLoanCalc',
                       region       = 'us',
                       lan          = 'en',
                       btnLabel     = 'Calculate',
                   })=>{
        let calculator = (<App lan={lan} btnLabel={btnLabel} region={region}/>);
        ReactDOM.render( calculator, document.getElementById(selector) );
    }

    window.VTAutoLoanCalculator = { init: _init }
})(window);
// */

// ReactDOM.render(<App region="us" lan="es" btnLabel="Calculate" />, document.getElementById('root'));

serviceWorker.unregister();
