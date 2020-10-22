
    VTCCPayoffFixedPaymentCalculator.init({
        selector: 'CCPayOffFixed',
        /* type: 'CCPayOff', */
        title: 'Calculadora de Pago de Tarjeta de Crédito',
        lan: 'es',
        showCard: true,
        cardContent: "<h2>¿Sabía Usted Que?</h2> <h3>Hay una mejor manera para liberarse de las deudas</h3> <p>Como puedes ver, realizar pagos mínimos no es una forma efectiva para liberarse de las deudas. Hacer el pago mínimo solo te cuesta tiempo y dinero.</p> <p>Con esta cantidad de deuda, podrías pagar alrededor de <strong>*@payments al mes</strong> en un programa de manejo de deudas y <strong>podrías liberarte de las deudas tan pronto como en 36-60 pagos</strong>. Llámanos hoy al <strong>@phone</strong> para una sesión de consejería de crédito gratis que te ayudará a encontrar una solución que te permita liberarte de las deudas de una vez por todas.</p>",
        colors: {
            card_header_BgC: '#007eb2',
            card_header_FontC: '#ffffff',
            card_borderC: '#dfdfdf',
            card_content_BgC: '#ffffff',
            card_content_FontC: '#000000',
            btn_BgC: '#e7ecef',
            btn_FontC: '#000000',
        },
        btnLabel : 'Podemos ayudarle',
        btnUrl : '#LeadForm',
        openModal: true,
        phoneNumber : '1-800-320-9929',
        phoneMessage : 'o llámenos al @phone',
    });
