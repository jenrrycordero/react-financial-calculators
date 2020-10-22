import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* (function(window){
    const _init = ({
        selector     = 'vtDMPcalc',
        lan          = 'en',
        ctaID        = '#LeadForm',
        ctaOpenModal = true,
        phoneNumber  = '1-800-320-9929',
    })=>{
        let calculator = (
            <App
                lan={lan}
                ctaID={ctaID}
                ctaOpenModal={ctaOpenModal}
                phoneNumber={phoneNumber}
            />
        );
        ReactDOM.render( calculator, document.getElementById(selector) );
    }

    window.VTDMPCalculator = { init: _init }
})(window); */
ReactDOM.render(<App lan='ca' phoneNumber='(844) 211-0165' ctaID="#LeadForm" ctaOpenModal={true} />, document.getElementById('root'));

serviceWorker.unregister();