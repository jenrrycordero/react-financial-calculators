import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

(function(window){
    const _init = ({
        selector     = 'vtDMP_V3calc',
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

    window.VTDMP_V3_Calculator = { init: _init }
})(window);
/* ReactDOM.render(<App lan='en' phoneNumber='(844) 211-0165' ctaID="#LeadForm" ctaOpenModal={true} />, document.getElementById('root')); */

serviceWorker.unregister();