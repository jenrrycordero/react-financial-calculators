import _ from 'underscore';

const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const penniesFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});


// eslint-disable-next-line no-extend-native
Number.prototype.formatMoneyN = function (c, d, t) {let n = this, value = isNaN(c = Math.abs(c)) ? 2 : c, dot = d === undefined ? "." : d, comma = t === undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(value)) + "", j_inc, j = (j_inc = i.length) > 3 ? j_inc % 3 : 0;return s + (j ? i.substr(0, j) + comma : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + comma) + (value ? dot + Math.abs(n - i).toFixed(value).slice(2) : "");};

export default class Util {
    static percentToValue(percent) {
        let value = percent;
        let strNumber = value.toString();

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
        let value = parseInt(money.replace(/\D/g, ""));
        return !isNaN(value) ? value : '';
    }

    static moneyValue(amount, showPennies = false, withSymbol = true) {
        if (amount === null || amount === '') return '';
        let value = showPennies ? penniesFormatter.format(amount) : moneyFormatter.format(amount);
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
        let negative = false;
        if (digits === undefined) {
            digits = 0;
        }
            if( n < 0) {
            negative = true;
          n = n * -1;
        }
        let multiplier = Math.pow(10, digits);
        n = parseFloat((n * multiplier).toFixed(11));
        n = (Math.round(n) / multiplier).toFixed(digits);
        if( negative ) {
            n = (n * -1).toFixed(2);
        }
        return n;
    }

    static percentValue(amount, withSymbol) {
        if (amount === null || amount === '') return '';
        let value = percentFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(0, value.length - 1);
        }
        return value;
    }

    static calculatePercent(total, subtotal) {
        return (isNaN(total) || isNaN(subtotal)) ? ' ' : Math.floor( (subtotal/total) * 100 );
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

    static getPossibleYears(num_years){
        const current = new Date();
        const currentYear = current.getFullYear();
        let years = [];
        let cont = 0;
        for(let y = currentYear; y<currentYear+num_years; y++){
            years.push({
                id: cont,
                title: y,
                selected: cont === 0 ? 1 : 0
            });

            cont++;
        }
        return years;
    }

    static pmt(rate, nper, pv, fv, type){
        if (!fv) fv = 0;
        if (!type) type = 0;

        if (rate === 0) return -(pv + fv)/nper;

        const PV = -pv;
        const pvif = Math.pow(1 + rate, nper);
        const pvif_minus_one = pvif - 1;

        let pmt = (rate / pvif_minus_one) * PV * pvif;

        if (type === 1) {
            pmt /= (1 + rate);
        }

        return pmt;
    }


    static estimateLoan(rate, nper, m_pmt) {

        if (rate === 0) return nper*m_pmt;

        const pvif = Math.pow(1 + rate, nper);
        const pvif_minus_one = pvif - 1;

        return (m_pmt/((rate/pvif_minus_one) * pvif)) * -1;
    }

    static translationsStringReplace(keys, translation) {

        let newTranslation = translation;

        if (!newTranslation)
            return '';

        Object.keys(keys).forEach((key) =>  {
            newTranslation = newTranslation.replace(`##${key}##`, keys[key])
        });
        return newTranslation;
    }

    static getMonths( months ){
        const current = new Date();
        const nextDate = new Date( current.setMonth(current.getMonth() + 1) );
        const nextMonth = nextDate.getMonth();
        const monthName = months[nextMonth];

        let auxMonths = [];
        _.each(months, (item, index) => {
            auxMonths.push({
                id: index,
                title: item,
                selected: monthName === item ? 1 : 0
            });
        });
        return auxMonths;
    }

    /* Function to get the start limit date */
    static getStartLimitDate (n) {
        return new Date(new Date().setMonth(new Date().getMonth() + n));
    }

    /* Function to get the next n years forward date */
    static getEndLimitDate (n) {
        return new Date(new Date().setFullYear(new Date().getFullYear() + n));
    }
}
