import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                k++;
            }

            return -1;
        },
        configurable: true,
        writable: true
    });
}

(function(window){
    const _init = ({
        selector     = 'vtLoanCostCalc',
        region       = 'us',
        lan          = 'en',
        btnLabel     = 'Calculate',
        title        = 'Credit Score Loan Cost Calculator'
    })=>{
        let calculator = (<App region={region} lan={lan} btnLabel={btnLabel} title={title} />);
        ReactDOM.render( calculator, document.getElementById(selector) );
    }

    window.VTLoanCostCalculator = { init: _init }
})(window);
// ReactDOM.render(<App region="us" lan="en" btnLabel='Calculate' title="Credit Score Loan Cost Calculator" />, document.getElementById('root'));

serviceWorker.unregister();