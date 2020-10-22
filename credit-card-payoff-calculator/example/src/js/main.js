import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import '../style/general.css';
import CCPayOffCalculator from './components/CCPayOff.jsx';

(function(window){
    const _init = ({
        selector = 'CCPayOff',
        title = 'Credit Card Payoff Calculator',
        lan = 'en',
        showCard = false,
        cardContent = '',
        colors = {
            card_header_BgC: '#f7f7f7',
            card_header_FontC: '#212121',
            card_borderC: '#dfdfdf',
            card_content_BgC: '#ffffff',
            card_content_FontC: '#000000',
            grafLeftSide_BgC: '#267cac',
            grafLeftSide_FontC: '#ffffff',
            grafRightSide_BgC: '#b81411',
            grafRightSide_FontC: '#ffffff'
        },
        btnLabel = '',
        btnUrl = '#LeadForm',
        openModal = true,
        phoneNumber = '1-800-320-9929',
        phoneMessage = ''
    })=>{
        let calculator = (
            <CCPayOffCalculator
                title = {title}
                lan = {lan}
                showCard = {showCard}
                cardContent = {cardContent}
                btnLabel = {btnLabel}
                btnUrl = {btnUrl}
                openModal = {openModal}
                colors = {colors}
                phoneNumber = {phoneNumber}
                phoneMessage = {phoneMessage}
            />
        );

        ReactDOM.render( calculator, document.getElementById(selector) );
    }

    window.VTCalculator = {
        init: _init,
    }
})(window)