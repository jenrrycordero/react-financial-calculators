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

Number.prototype.formatMoneyN = function (c, d, t) { var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d === undefined ? "." : d, t = t === undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") };

export default class Util {
    static percentToValue(percent) {
        var value = percent;
        var strNumber = value.toString();

        if (isNaN(value) || value < 0) {
            return '';
        }
        if(value >= 101){
            return parseFloat( strNumber.substring(0, strNumber.length - 1) );
        }
        if(value < 101){
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
    static removeMoneyTrash(money){
        return money.replace('$', '').replace(',', "");
    }

    static cleanNumberInput(value){
        return /^-?\d*[.,]?\d*$/.test(value);
    }

    static valueIsInteger(value){
        if(value === '-')
            return true;
        else
            return /^\d*$/.test(value) && !(/^0\d+$/.test(value));
    }

    static formatMoney(value) {
        return parseFloat(value.replace(/[^0-9.]/g, '')).formatMoneyN();
    };

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
        n = (Math.round(n) / multiplicator).toFixed(digits);
        if( negative ) {
            n = (n * -1).toFixed(2);
        }
        return n;
    }

    static percentValue(amount, withSymbol) {
        if (amount === null || amount === '') return '';
        var value = percentFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(0, value.length - 1);
        }
        return value;
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

    /*
    * Converts months to years and years to months
    * @param time_n (number): amount of time (number of months or years)
    * @parram is_month (bool): use true to convert from months to years and false to get months from years
    */
    static calculateMonthsYears(time_n = 1, is_month = true) {
        let time_result = Number(time_n) * 12;
        if(is_month) {
            time_result = this.roundTo( (Number(time_n) / 12), 1 );
        }

        return time_result;
    }

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

}