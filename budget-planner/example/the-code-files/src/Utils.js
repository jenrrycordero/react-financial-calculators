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

    static calculatePercent(percent, total){
        let perc = 0;
        if(!isNaN(total) && !isNaN(percent)){
           const number = (percent*total) / 100;
           perc = this.roundTo( number, 2 );
        }

        return perc;
    }

    static removeMoneyTrash(money){
        //return Number(money.replace('$', ''))
        return money.replace('$', '').replace(',', "");
    }

    static removePercentage(value){
        return parseFloat(value.replace('%', ''))
    }

    static formatMoneyS(rawNumber) {
        return "$" + rawNumber;
    }

    static cleanNumberInput(value){
        return /^-?\d*[.,]?\d*$/.test(value);
    }

    static valueIsInteger(value){
        return /^\d*$/.test(value);
    }

    static formatMoney(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        //return Number(value).toLocaleString();
    };

}