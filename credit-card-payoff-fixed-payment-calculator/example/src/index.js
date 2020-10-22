import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// /*
(function(window){
    const _init = ({
        selector = 'CCPayOff',
        title = 'Credit  Calculator',
        lan = 'en',
        showCard = false,
        cardContent = '',
        colors = {
            card_header_BgC: '#f7f7f7',
            card_header_FontC: '#212121',
            card_borderC: '#dfdfdf',
            card_content_BgC: '#ffffff',
            card_content_FontC: '#000000',
        },
        btnLabel = '',
        btnUrl = '#LeadForm',
        openModal = true,
        phoneNumber = '1-800-320-9929',
        phoneMessage = ''
    })=>{
        let calculator = (<App
    title={title}
    lan={lan}
    showCard={showCard}
    cardContent={cardContent}
    colors={colors}
    btnLabel={btnLabel}
    btnUrl={btnUrl}
    openModal={openModal}
    phoneNumber={phoneNumber}
    phoneMessage={phoneMessage}/>);
        ReactDOM.render( calculator, document.getElementById(selector) );
    }

    window.VTCCPayoffFixedPaymentCalculator = { init: _init }
})(window);

// */
/*
    let title = 'Credit  Calculator',
    lan = 'es',
    showCard = true,
    cardContent = "<h2>Did You Know?</h2> <h3>There’s a Better Way to Get Out of Debt</h3> <p>As you can see, minimum payments are not an effective way to get out of debt. They’re costing you time and money that you can't afford to waste.</p> <p>With this amount of debt, you could pay around <strong>*@payments per month</strong> on a debt management program, and you could be out of debt in as little as <strong>@months payments</strong>. Paying a total of <strong>@money</strong> with <strong> @interest </strong> in debt. Call us today at <strong>@phone</strong> for free credit counseling to find a solution that will finally help you become debt free.</p>",
    colors = {
        card_header_BgC: '#f7f7f7',
        card_header_FontC: '#212121',
        card_borderC: '#dfdfdf',
        card_content_BgC: '#ffffff',
        card_content_FontC: '#000000',
    },
    btnLabel = 'Call us now',
    btnUrl = '#LeadForm',
    openModal = true,
    phoneNumber = '1-800-320-9929',
    phoneMessage = '';

    if (lan === 'es') {
        cardContent = "<h2>¿Sabía Usted Que?</h2> <h3>Hay una mejor manera para liberarse de las deudas</h3> <p>Como puedes ver, realizar pagos mínimos no es una forma efectiva para liberarse de las deudas. Hacer el pago mínimo solo te cuesta tiempo y dinero.</p> <p>Con esta cantidad de deuda, podrías pagar alrededor de <strong>*@payments al mes</strong> en un programa de manejo de deudas y <strong>podrías liberarte de las deudas tan pronto como en 36-60 pagos</strong>. Llámanos hoy al <strong>@phone</strong> para una sesión de consejería de crédito gratis que te ayudará a encontrar una solución que te permita liberarte de las deudas de una vez por todas.</p>";
        btnLabel = "Podemos ayudarle";
    }

    ReactDOM.render(<App
        title={title}
        lan={lan}
        showCard={showCard}
        cardContent={cardContent}
        colors={colors}
        btnLabel={btnLabel}
        btnUrl={btnUrl}
        openModal={openModal}
        phoneNumber={phoneNumber}
        phoneMessage={phoneMessage}
     />, document.getElementById('root'));
 */
serviceWorker.unregister();
