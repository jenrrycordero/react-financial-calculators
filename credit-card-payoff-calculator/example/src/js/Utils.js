var moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

var penniesFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    /* minimumFractionDigits: 2,
    maximumFractionDigits: 2,*/
});

var percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

export default class Util {
    static percentToValue(percent) {
        var value = percent;
        var strNumber = value.toString();

        if (isNaN(value) || value < 0) {
            return '';
        }
        if(value >= 35){
            return parseFloat( strNumber.substring(0, strNumber.length - 1) );
        }
        if(value < 35){
            return strNumber.substring(0, 4);
        }
        return value;
    }

    static moneyToValue(money) {
        if (money === undefined) return '';
        var value = parseInt(money.replace(/\D/g, ""));
        return !isNaN(value) ? value : '';
    }

    static moneyValue(amount, showPennies = false, withSymbol = true) {
        if (amount === null || amount === '') return '';
        var value = showPennies ? penniesFormatter.format(amount) : moneyFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(1);
        }
        return value;
    }

    static percentValue(amount, withSymbol) {
        if (amount === null || amount === '') return '';
        var value = percentFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(0, value.length - 1);
        }
        return value;
    }

    static parseCardContent(htmlContent, debt='', payments='', money='', months='', interest='', phone=''){
        return htmlContent
                .replace('@debt', "<span id='debt'>"+debt+"</span>")
                .replace('@payments', "<span id='debt_res'>"+payments+"</span>")
                .replace('@money', "<span id='money_res'>$"+money+"</span>")
                .replace('@months', "<span id='months_res'>"+months+"</span>")
                .replace('@interest', "<span id='interest_res'>"+interest+"</span>")
                .replace('@phone', "<a class='no-tracking-phone-click' href='tel: "+phone+"'><span itemprop='telephone' class='tracking-phone'>"+phone+"</span></a>");
    }

    static getDateFromNumberOfMonths(monthCount, lan) {
        function getPlural(number, word) {
            return number === 1 && word.one || word.other;
        }

        const months = {
            en:{
                one: 'month',
                other: 'months',
            },
            es:{
                one: 'mes',
                other: 'meses',
            },
            ca:{
                one: 'month',
                other: 'months',
            },
        };
        const years = {
            en:{
                one: 'year',
                other: 'years',
            },
            es:{
                one: 'año',
                other: 'años',
            },
            ca:{
                one: 'year',
                other: 'years',
            },
        };
        const and = {
            en: ' and ',
            es: ' y ',
            ca: ' and ',
        };

        let m = monthCount % 12;
        let y = Math.floor(monthCount / 12);
        let result = [];

        y && result.push(y + ' ' + getPlural(y, years[lan]));
        m && result.push(m + ' ' + getPlural(m, months[lan]));

        return result.join(and[lan]);
    }

    static calculatePercent(total, subtotal){
        let perc = '';
        if(isNaN(total) || isNaN(subtotal)){
            perc=' ';
        }else{
           perc = Math.floor( (subtotal/total) * 100 );
        }

        return perc;
    }

    static countDecimalPlaces(number) {
        const str = "" + number;
        const index = str.indexOf('.');
        if (index >= 0) {
            return str.length - index - 1;
        } else {
            return 0;
        }
    }

}