export default class Util {
    static removeMoneyTrash(money){
        return money.replace('$', '').replace(',', "");
    }

    static cleanNumberInput(value){
        return /^-?\d*[.,]?\d*$/.test(value);
    }

    static valueIsInteger(value){
        return /^\d*$/.test(value) && !(/^0\d+$/.test(value));
    }

    static formatMoney(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    static getDateFromNumberOfMonths(monthCount, lan) {
        function getPlural(number, word) {
            return number === 1 ? word.one : word.other;
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
            fr:{
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
            fr:{
                one: 'year',
                other: 'years',
            },
        };
        const and = {
            en: ' and ',
            es: ' y ',
        };

        let m = monthCount % 12;
        let y = Math.floor(monthCount / 12);
        let result = [];

        y && result.push(y + ' ' + getPlural(y, years[lan]));
        m && result.push(m + ' ' + getPlural(m, months[lan]));

        return result.join(and[lan]);
    }

    static roundTo(n, digits) {
        var negative = false;
        if (digits === undefined) {
            digits = 0;
        }
            if( n < 0) {
            negative = true;
          n = n * -1;
        }
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        n = (Math.round(n) / multiplicator).toFixed(2);
        if( negative ) {
            n = (n * -1).toFixed(2);
        }
        return n;
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