(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{141:function(e,t,a){e.exports=a(307)},259:function(e,t,a){},260:function(e,t,a){},261:function(e,t,a){},307:function(e,t,a){"use strict";a.r(t);a(142);var n=a(0),r=a.n(n),o=a(41),l=a.n(o),s=a(48),i=a(137),m=a(29),c=a(30),u=a(46),d=a(42),h=a(47),y=a(101),p=a.n(y),b=(a(249),a(138)),x=a(140),f=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}),E=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),v=new Intl.NumberFormat("en-US",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:2});Number.prototype.formatMoneyN=function(e,t,a){var n=this,r=(e=isNaN(e=Math.abs(e))?2:e,t=void 0===t?".":t,a=void 0===a?",":a,n<0?"-":""),o=parseInt(n=Math.abs(+n||0).toFixed(e))+"",l=(l=o.length)>3?l%3:0;return r+(l?o.substr(0,l)+a:"")+o.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+a)+(e?t+Math.abs(n-o).toFixed(e).slice(2):"")};var g=function(){function e(){Object(m.a)(this,e)}return Object(c.a)(e,null,[{key:"percentToValue",value:function(e){var t=e,a=t.toString();return isNaN(t)||t<0?"":t>=101?parseFloat(a.substring(0,a.length-1)):t<101?a.substring(0,4):t}},{key:"moneyToValue",value:function(e){if(void 0===e)return"";var t=parseInt(e.replace(/\D/g,""));return isNaN(t)?"":t}},{key:"moneyValue",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(null===e||""===e)return"";var n=t?E.format(e):f.format(e);return!1===a?n.substring(1):n}},{key:"removeMoneyTrash",value:function(e){return e.replace("$","").replace(",","")}},{key:"cleanNumberInput",value:function(e){return/^-?\d*[.,]?\d*$/.test(e)}},{key:"valueIsInteger",value:function(e){return"-"===e||/^\d*$/.test(e)&&!/^0\d+$/.test(e)}},{key:"formatMoney",value:function(e){return parseFloat(e.replace(/[^0-9.]/g,"")).formatMoneyN()}},{key:"roundTo",value:function(e,t){var a=!1;void 0===t&&(t=0),e<0&&(a=!0,e*=-1);var n=Math.pow(10,t);return e=parseFloat((e*n).toFixed(11)),e=(Math.round(e)/n).toFixed(t),a&&(e=(-1*e).toFixed(2)),e}},{key:"percentValue",value:function(e,t){if(null===e||""===e)return"";var a=v.format(e);return!1===t?a.substring(0,a.length-1):a}},{key:"calculatePercent",value:function(e,t){return isNaN(e)||isNaN(t)?" ":Math.floor(t/e*100)}},{key:"countDecimalPlaces",value:function(e){var t=""+e,a=t.indexOf(".");return a>=0?t.length-a-1:0}},{key:"calculateMonthsYears",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=12*Number(e);return t&&(a=this.roundTo(Number(e)/12,1)),a}},{key:"getDateFromNumberOfMonths",value:function(e,t){function a(e,t){return 1===e?t.one:t.other}var n=e%12,r=Math.floor(e/12),o=[];return r&&o.push(r+" "+a(r,{en:{one:"year",other:"years"},es:{one:"a\xf1o",other:"a\xf1os"},ca:{one:"year",other:"years"},fr:{one:"year",other:"years"}}[t])),n&&o.push(n+" "+a(n,{en:{one:"month",other:"months"},es:{one:"mes",other:"meses"},ca:{one:"month",other:"months"},fr:{one:"month",other:"months"}}[t])),o.join({en:" and ",es:" y "}[t])}},{key:"getPossibleYears",value:function(e){for(var t=(new Date).getFullYear(),a=[],n=0,r=t;r<t+e;r++)a.push({id:n,title:r,selected:0===n?1:0}),n++;return a}},{key:"getMonthds",value:function(e){var t=new Date,a=e[new Date(t.setMonth(t.getMonth()+1)).getMonth()],n=[];return e.map(function(e,t){n.push({id:t,title:e,selected:a===e?1:0})}),n}},{key:"getStartLimitDate",value:function(e){return new Date((new Date).setMonth((new Date).getMonth()+e))}},{key:"getEndLimitDate",value:function(e){return new Date((new Date).setFullYear((new Date).getFullYear()+e))}}]),e}(),P={en:{calculatorTitle:"Loan Calculator",amountLabel:"Amount",amountHelpText:"This is the total amount you wish to borrow.",monthlyDepositLabel:"Monthly Deposit",balance:"Balance",interest:"Interest",totalPrincipalPaid:"Total Principal Paid",totalInterestPaid:"Total Interest Paid",principalPaid:"Principal paid",interestPaid:"Interest paid",monthYearText:"Month/Year",interestHelpText:"This is the annual interest rate of your loan; it\u2019s should be defined in your loan agreement.",payments:"Payments",paymentSingular:"Payment",paymentLower:"payments",monthlyPayments:"Monthly Payments",interestLabel:"Interest rate",monthly:"monthly",yearText:"year",yearPluralText:"years",yearPluralTextCaipal:"Years",TimeToRepayText:"Time to repay",totalBalanceText:"Total balance",totalInterestText:"Total interest",monthlyText:"Monthly",anuallyText:"Anually",biweeklyText:"Bi-weekly",biweeklyLowerText:"bi-weekly",loanAmount:"Loan Amount",termInYears:"Loan term in years",termInMonths:"or months",orText:"Or",dateHelpText:"The term of a loan is the amount of time you have to pay it off in full. Please choose a term in either years or months.",startDateText:"Start Date",startDateHelpText:"This is the date you will receive your funds. Payments usually begin the month after the start date.",moneyFieldError:"Use positive numbers less than 1 million.",percentageFieldError:"Use positive numbers less than 100.",yearsError:"Use real number of years (Less than 100).",monthsError:"Use real number of months (Less than 1200).",timeError:"Use real number of years and months (1 < years < 100 | 12 < months < 1200).",estimatedPayoffDate:"Estimated Payoff Date",amortizationSchedule:"Amortization Schedule",startingDateEmptyText:"There is no starting date selected.",selectDatePlaceholder:"Click to select a date",fullMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],showAmortizationBtnText:"Show Amortization Schedule",hideAmortizationBtnText:"Hide Amortization Schedule",withExtraPayments:"With extra payments",withoutExtraPayments:"Without extra payments",showExtraPayments:"Add Extra Payments",hideExtraPayments:"Hide Extra Payments",extraPaymentsText1:"Enter an amount on one of the options below and click \u201cAdd Extra Payments\u201d to see how it will change the monthly payment, interest paid and total cost of your loan.",extraPaymentHelp1:"Add a set amount of money that you will add to your monthly payment every month.",extraPaymentHelp2:"Make one extra payment every year on a set month.",extraPaymentHelp3:"Make a one-time extra payment on a designated month and year",extraPaymentLabel1:"add to your monthly payment",extraPaymentLabel2:"as an extra annual payment every:",extraPaymentLabel3:"as a one-time extra payment in:",addExtraBtnTitle:"Add Extra Payments",extraLumpError:"Extra payment cannot be made before the current date.",dateHelpMessage:"*Please enter a date as: mm/dd/yyyy",amortizationTableHelp:"This table summarizes the repayment schedule of a loan, including dividing the monthly payment between principal and interest charges, total interest paid and the balance of the loan after each payment."},es:{calculatorTitle:"Calculadora de Pr\xe9stamos",amountLabel:"Monto",amountHelpText:"Es la cantidad total que desea tomar prestada.",monthlyDepositLabel:"Dep\xf3sito Mensual",balance:"Balance",interest:"Inter\xe9s",totalPrincipalPaid:"Total del monto principal pagado",totalInterestPaid:"Total del inter\xe9s pagado",principalPaid:"Principal",interestPaid:"Inter\xe9s pagado",monthYearText:"Mes/A\xf1o",interestHelpText:"Es la tasa de inter\xe9s anual de su pr\xe9stamo, que debe ser definida en el contrato del pr\xe9stamo.",payments:"Pagos",paymentSingular:"Pago",paymentLower:"pagos",monthlyPayments:"Pagos mensuales",interestLabel:"Tasa de inter\xe9s",monthly:"mensual",yearText:"a\xf1o",yearPluralText:"a\xf1os",yearPluralTextCaipal:"A\xf1os",TimeToRepayText:"Tiempo para pagar",totalInterestText:"Inter\xe9s total",monthlyText:"Mensual",anuallyText:"Anual",biweeklyText:"Quincenal",loanAmount:"Monto del pr\xe9stamo",termInYears:"T\xe9rmino en a\xf1os",termInMonths:"o meses",orText:"O",dateHelpText:"El t\xe9rmino de un pr\xe9stamo es la cantidad de tiempo que usted tendr\xe1 para pagar el total del monto. Por favor escoja un t\xe9rmino en a\xf1os o meses.",startDateText:"Fecha de Comienzo",startDateHelpText:"Es la fecha en que usted recibir\xe1 el dinero prestado. Usualmente los pagos comienzan el mes siguiente luego de la fecha de comienzo.",moneyFieldError:"Use n\xfameros positivos menores que 1 mill\xf3n.",percentageFieldError:"Use n\xfameros positivos menores que 100",yearsError:"Use una cantidad real de a\xf1os. No se permiten puntos.",monthsError:"Use una cantidad real de meses (menos de 1200).",timeError:"Use un n\xfamero real de a\xf1os o meses (a\xf1os <100 | meses <1200).",estimatedPayoffDate:"Fecha Estimada de su Pago Final",amortizationSchedule:"Plan de amortizaci\xf3n",startingDateEmptyText:"No hay una fecha de inicio seleccionada.",selectDatePlaceholder:"Seleccione una fecha",fullMonths:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],shortMonths:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],showAmortizationBtnText:"Ver tabla de amortizaci\xf3n",hideAmortizationBtnText:"Ocultar tabla de amortizaci\xf3n",withExtraPayments:"Con pagos extras",withoutExtraPayments:"Sin pagos extras",showExtraPayments:"A\xf1adir Pagos Adicionales",hideExtraPayments:"Ocultar Pagos Extras",extraPaymentsText1:"Ingrese la cantidad en una de las alternativas abajo, luego haga click en \u201cA\xf1adir Pagos Adicionales\u201d para ver c\xf3mo cambia su pago mensual, el inter\xe9s pagado y el costo total de su pr\xe9stamo.",extraPaymentHelp1:"A\xf1adir una cantidad de dinero determinada a su pago mensual.",extraPaymentHelp2:"Hacer un pago adicional cada a\xf1o, en un mes determinado.",extraPaymentHelp3:"Hacer un pago adicional por \xfanica vez en un mes y a\xf1o determinados.",extraPaymentLabel1:"a\xf1adir a su pago mensual",extraPaymentLabel2:"como un pago anual extra cada:",extraPaymentLabel3:"como un pago \xfanico extra en:",addExtraBtnTitle:"Adicionar pagos extras",extraLumpError:"El pago adicional no puede hacerse antes de la fecha actual.",dateHelpMessage:"*Por favor ingrese la fecha en formato mm/dd/a\xf1o (el a\xf1o debe tener cuatro d\xedgitos)",amortizationTableHelp:"Esta tabla resume el plan de pagos de un pr\xe9stamo, incluyendo el desglose del pago mensual entre el balance principal y los cargos por inter\xe9s, el inter\xe9s total pagado y el balance del pr\xe9stamo luego de cada pago."},ca:{calculatorTitle:"Loan Calculator",amountLabel:"Amount",amountHelpText:"This is the total amount you wish to borrow.",monthlyDepositLabel:"Monthly Deposit",balance:"Balance",interest:"Interest",totalPrincipalPaid:"Total Principal Paid",totalInterestPaid:"Total Interest Paid",principalPaid:"Principal paid",interestPaid:"Interest paid",monthYearText:"Month/Year",interestHelpText:"This is the annual interest rate of your loan; it\u2019s should be defined in your loan agreement.",payments:"Payments",paymentSingular:"Payment",paymentLower:"payments",monthlyPayments:"Monthly Payments",interestLabel:"Interest rate",monthly:"monthly",yearText:"year",yearPluralText:"years",yearPluralTextCaipal:"Years",TimeToRepayText:"Time to repay",totalBalanceText:"Total balance",totalInterestText:"Total interest",monthlyText:"Monthly",anuallyText:"Anually",biweeklyText:"Bi-weekly",loanAmount:"Loan Amount",termInYears:"Loan term in years",termInMonths:"or months",orText:"Or",dateHelpText:"The term of a loan is the amount of time you have to pay it off in full. Please choose a term in either years or months.",startDateText:"Start Date",startDateHelpText:"This is the date you will receive your funds. Payments usually begin the month after the start date.",moneyFieldError:"Use positive numbers less than 1 million.",percentageFieldError:"Use positive numbers less than 100.",yearsError:"Use real number of years (Less than 100).",monthsError:"Use real number of months (Less than 1200).",timeError:"Use real number of years and months (1 < years < 100 | 12 < months < 1200).",estimatedPayoffDate:"Estimated Payoff Date",amortizationSchedule:"Amortization Schedule",startingDateEmptyText:"There is no starting date selected.",selectDatePlaceholder:"Click to select a date",fullMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],showAmortizationBtnText:"Show Amortization Schedule",hideAmortizationBtnText:"Hide Amortization Schedule",withExtraPayments:"With extra payments",withoutExtraPayments:"Without extra payments",showExtraPayments:"Add Extra Payments",hideExtraPayments:"Hide Extra Payments",extraPaymentsText1:"Enter an amount on one of the options below and click \u201cAdd Extra Payments\u201d to see how it will change the monthly payment, interest paid and total cost of your loan.",extraPaymentHelp1:"Add a set amount of money that you will add to your monthly payment every month.",extraPaymentHelp2:"Make one extra payment every year on a set month.",extraPaymentHelp3:"Make a one-time extra payment on a designated month and year",extraPaymentLabel1:"add to your monthly payment",extraPaymentLabel2:"as an extra annual payment every:",extraPaymentLabel3:"as a one-time extra payment in:",addExtraBtnTitle:"Add Extra Payments",extraLumpError:"Extra payment cannot be made before the current date.",dateHelpMessage:"*Please enter a Date as: mm/dd/yyyy",amortizationTableHelp:"This table summarizes the repayment schedule of a loan, including dividing the monthly payment between principal and interest charges, total interest paid and the balance of the loan after each payment."},fr:{calculatorTitle:"Loan Calculator",amountLabel:"Amount",amountHelpText:"This is the total amount you wish to borrow.",monthlyDepositLabel:"Monthly Deposit",balance:"Balance",interest:"Interest",totalPrincipalPaid:"Total Principal Paid",totalInterestPaid:"Total Interest Paid",principalPaid:"Principal paid",interestPaid:"Interest paid",monthYearText:"Month/Year",interestHelpText:"This is the annual interest rate of your loan; it\u2019s should be defined in your loan agreement.",payments:"Payments",paymentSingular:"Payment",paymentLower:"payments",monthlyPayments:"Monthly Payments",interestLabel:"Interest rate",monthly:"monthly",yearText:"year",yearPluralText:"years",yearPluralTextCaipal:"Years",TimeToRepayText:"Time to repay",totalBalanceText:"Total balance",totalInterestText:"Total interest",monthlyText:"Monthly",anuallyText:"Anually",biweeklyText:"Bi-weekly",loanAmount:"Loan Amount",termInYears:"Term in years",termInMonths:"or months",orText:"Or",dateHelpText:"The term of a loan is the amount of time you have to pay it off in full. Please choose a term in either years or months.",startDateText:"Start Date",startDateHelpText:"This is the date you will receive your funds. Payments usually begin the month after the start date.",moneyFieldError:"Use positive numbers less than 1 million.",percentageFieldError:"Use positive numbers less than 100.",yearsError:"Use real number of years (Less than 100).",monthsError:"Use real number of months (Less than 1200).",timeError:"Use real number of years and months (1 < years < 100 | 12 < months < 1200).",estimatedPayoffDate:"Estimated Payoff Date",amortizationSchedule:"Amortization Schedule",startingDateEmptyText:"There is no starting date selected.",selectDatePlaceholder:"Click to select a date",fullMonths:["Janvier","F\xe9vrier","Mars","Avril","Mai","Juin","Juillet","Ao\xfbt","Septembre","Octobre","Novembre","D\xe9cembre"],shortMonths:["Jan","F\xe9v","Mar","Avr","Mai","Jui","Juil","Ao\xfb","Sep","Oct","Nov","D\xe9c"],showAmortizationBtnText:"Show Amortization Schedule",hideAmortizationBtnText:"Hide Amortization Schedule",withExtraPayments:"With extra payments",withoutExtraPayments:"Without extra payments",showExtraPayments:"Add Extra Payments",hideExtraPayments:"Hide Extra Payments",extraPaymentsText1:"Enter an amount on one of the options below and click \u201cAdd Extra Payments\u201d to see how it will change the monthly payment, interest paid and total cost of your loan.",extraPaymentHelp1:"Add a set amount of money that you will add to your monthly payment every month.",extraPaymentHelp2:"Make one extra payment every year on a set month.",extraPaymentHelp3:"Make a one-time extra payment on a designated month and year",extraPaymentLabel1:"add to your monthly payment",extraPaymentLabel2:"as an extra annual payment every:",extraPaymentLabel3:"as a one-time extra payment in:",addExtraBtnTitle:"Add Extra Payments",extraLumpError:"Extra payment cannot be made before the current date.",dateHelpMessage:"*Please enter a valid Date format (mm/dd/year)",amortizationTableHelp:"This table summarizes the repayment schedule of a loan, including dividing the monthly payment between principal and interest charges, total interest paid and the balance of the loan after each payment."}};var T=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={hover:!1},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleMouseInOut",value:function(){this.setState({hover:!this.state.hover})}},{key:"handleTooltip",value:function(){this.setState({hover:!this.state.hover})}},{key:"render",value:function(){return r.a.createElement("div",{className:"tooltipContainer"},r.a.createElement("div",{className:"helpMiniDisk",onClick:this.handleTooltip.bind(this),onMouseOver:this.handleMouseInOut.bind(this),onMouseOut:this.handleMouseInOut.bind(this)},"?"),r.a.createElement("div",{className:"customTooltip",style:{visibility:this.state.hover?"visible":"hidden"}},this.props.content))}}]),t}(n.Component),w=a(75),N=(a(259),function(e){var t=e.id,a=e.label,n=e.name,o=e.value,l=e.placeholder,s=e.icon,i=(e.isIntiger,e.iconPosition),m=e.tooltipContent,c=e.errorMsg,u=e.errorOccur,d=e.onChange,h=r.a.createElement("div",{className:"input-group"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text ".concat(u?"inputIconError":"")},s)),r.a.createElement(w.a,{id:t,name:n,value:o,className:"form-control ".concat(u?"inputError":""),placeholder:l,thousandSeparator:!0,allowNegative:!1,onValueChange:function(e){var t=e.value;d({name:n,value:t})}}));"right"===i&&(h=r.a.createElement("div",{className:"input-group"},r.a.createElement(w.a,{id:t,name:n,value:o,className:"form-control ".concat(u?"inputError":""),placeholder:l,thousandSeparator:!0,allowNegative:!1,onValueChange:function(e){var t=e.value;d({name:n,value:t})}}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("span",{className:"input-group-text ".concat(u?"inputIconError":"")},s))));var y=r.a.createElement(w.a,{id:t,name:n,value:o,className:"form-control ".concat(u?"inputError":""),placeholder:l,thousandSeparator:!1,allowNegative:!1,onValueChange:function(e){var t=e.value;d({name:n,value:t})}});return r.a.createElement(r.a.Fragment,null,a&&r.a.createElement("label",{htmlFor:t,className:"col-12 loan-label"},r.a.createElement(T,{content:m})," ",a),r.a.createElement("div",{className:"col-12"},s?h:y,r.a.createElement("small",{className:"inputErrorText ".concat(u?"show":"hide")},c)))}),M=function(e){var t=e.columns;return r.a.createElement("thead",null,r.a.createElement("tr",null,t.map(function(e){return r.a.createElement("th",{key:e},e)})))},D=function(e){var t=e.data;return r.a.createElement("tbody",null,t.map(function(e,t){return r.a.createElement("tr",{key:t+"_row",className:e.bg_class},Object.keys(e).map(function(a,n){return"bg_class"!==a&&r.a.createElement("td",{key:t+"_"+n+"cell"},e[a],n>0&&1===g.countDecimalPlaces(e[a])&&"0")}))}))},k=function(e){var t=e.columns,a=e.data;return r.a.createElement("table",{className:"table table-bordered table-hover"},r.a.createElement(M,{columns:t}),r.a.createElement(D,{data:a}))},A=a(58),L=(a(260),function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={listOpen:!1},a.close=a.close.bind(Object(A.a)(Object(A.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(){var e=this;setTimeout(function(){e.state.listOpen?window.addEventListener("click",e.close):window.removeEventListener("click",e.close)},0)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("click",this.close)}},{key:"close",value:function(e){this.setState({listOpen:!1})}},{key:"selectItem",value:function(e){this.setState({listOpen:!1},this.props.handleBPSelect(e,this.props.name))}},{key:"toggleList",value:function(){this.setState(function(e){return{listOpen:!e.listOpen}})}},{key:"render",value:function(){var e=this,t=this.state.listOpen,a=this.props.list.filter(function(e){return e.selected})[0].title;return r.a.createElement("div",{className:"dd-wrapper"},r.a.createElement("div",{className:"dd-header",onClick:function(){return e.toggleList()}},r.a.createElement("div",{className:"dd-header-title"},r.a.createElement("span",null,a)),t?r.a.createElement("i",{className:"select-arrow up"}):r.a.createElement("i",{className:"select-arrow down"})),t&&r.a.createElement("ul",{className:"dd-list",onClick:function(e){return e.stopPropagation()}},this.props.list.map(function(t){return r.a.createElement("li",{className:t.selected?"dd-list-item selected":"dd-list-item",key:t.id,onClick:function(){return e.selectItem(t.id)}},r.a.createElement("span",null,t.title))})))}}]),t}(n.Component));a(261);Object(y.registerLocale)("es",x.a);var S=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleChange=function(e){var t=Object(i.a)({},a.state);t[e.name]=e.value,"extra_monthly_amount"!==e.name&&"extra_yearly_amount"!==e.name&&"extra_lump_amount"!==e.name||!0!==t.showResults?t.showResults=!1:t.showResults=!0,a.setState(t)},a.handleBPSelect=function(e,t){var n,r=JSON.parse(JSON.stringify(a.state[t]));r.forEach(function(e){return e.selected=!1}),r[e].selected=!0;var o=new Date,l=o.getFullYear(),i=o.getMonth(),m=a.state.extraLumpMonths.findIndex(function(e){return e.selected}),c=!1;"extraLumpYears"===t&&r[e].title===l&&m<i?c=!0:"extraLumpMonths"===t&&a.state.extraLumpYears.filter(function(e){return e.selected})[0].title===l&&a.state.extraLumpMonths.findIndex(function(t){return t.title===r[e].title})<i&&(c=!0),a.setState((n={},Object(s.a)(n,t,r),Object(s.a)(n,"showEPayError",c),n))},a.handleTimeChange=function(e){var t=e.target,n=t.name,r=t.value,o=Math.floor(r),l=0;if("years"===n)l=g.calculateMonthsYears(o,!1),a.setState({years:o,months:l,showResults:!1});else{var s=(l=g.calculateMonthsYears(o))-Math.floor(l),i=l.toString();0===s&&(i=i.split(".")[0]),a.setState({months:o,years:i,showResults:!1})}},a.keyUpHandlerTime=function(e){var t=e.target,n=t.name,r=t.value,o=Math.floor(r);a.setState(Object(s.a)({},n,o))},a.calculateAmortization=function(){var e=a.state,t=e.amount,n=e.interest,r=e.months,o=e.startDate,l=e.extra_monthly_amount,s=e.extra_yearly_amount,i=e.extra_lump_amount,m=e.extraYearlyMonths,c=e.extraLumpMonths,u=e.extraLumpYears,d=e.translations,h=m.findIndex(function(e){return e.selected}),y=c.findIndex(function(e){return e.selected}),p=Number(u.filter(function(e){return e.selected})[0].title),b=Number(n)/100/12,x=b*Number(t)*Math.pow(1+b,Number(r))/(Math.pow(1+b,Number(r))-1),f=x,E=0,v="trbg-default",P=v;l&&(x+=Number(l),v="trbg-lblue");for(var T=Number(x),w=T,N=r,M="",D="",k="",A="",L="",S=0,_=[],O=0;O<N&&(P=v,D=new Date(o),k=(M=new Date(D.setMonth(D.getMonth()+O+1))).getMonth(),A=M.getFullYear(),s&&h===k?(T+=Number(s),P=i&&"0"!==i&&y===k&&p===A?"trbg-lgreen":"trbg-lsky"):i&&y===k&&p===A?(T+=Number(i),P="trbg-lgreen"):T=w,L=t*b,t<(S=Number(T)-Number(L))&&(T=(S=t)+Number(L)),t-=S,E+=L,_.push({month_year:d.shortMonths[k]+" - "+A,payment:"$"+g.formatMoney(g.roundTo(T,2)),principalPaid:"$"+g.formatMoney(g.roundTo(S,2)),interestPaid:"$"+g.formatMoney(g.roundTo(L,2)),totalInterest:"$"+g.formatMoney(g.roundTo(E,2)),balance:"$"+g.formatMoney(g.roundTo(t,2)),bg_class:P}),!(t<=0));O++);var I=new Date,C=I.getFullYear(),F=I.getMonth(),H=!1;u.filter(function(e){return e.selected})[0].title===C&&y<F&&(H=!0),a.setState({monthlyPayment:f,tableResults:_,dateToFinish:M,showResults:!0,showEPayError:H},function(){a.state.showAmortization&&a.scrollTo("loanPaymentResults")})},a.handleAmortizationAction=function(){var e=a.state.showAmortization;e=!e,a.setState({showAmortization:e},function(){return a.scrollTo("loanPaymentResults")})},a.handleExtraPaymentFields=function(){var e=JSON.parse(JSON.stringify(a.state.tableResults)),t=a.state.showExtraPayments;(t=!t)?a.setState({showExtraPayments:t}):(e.forEach(function(e){return e.bg_class="trbg-default"}),a.setState({showExtraPayments:t,extra_monthly_amount:0,extra_yearly_amount:0,extra_lump_amount:0,tableResults:e},function(){a.scrollTo("renderResultTitle"),a.calculateAmortization()}))},a.renderResults=function(){var e=a.state,t=e.amount,n=e.monthlyPayment,o=e.tableResults,l=e.translations,s=e.showAmortization;return r.a.createElement("div",{className:"mt-3 col-sm-5 col-lg-7 col-xl-5 text-center"},r.a.createElement("h3",{className:"loan-titles",id:"renderResultTitle"},l.monthlyPayments),r.a.createElement("div",{className:"mp-result mb-5"},r.a.createElement("div",{className:"mp-dolar-sign"},"$"),r.a.createElement("div",{className:"mp-dolar-numbers"},g.formatMoney(g.roundTo(n,2)))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-8"},l.totalPrincipalPaid),r.a.createElement("div",{className:"col-4 text-black"},"$"+g.formatMoney(g.roundTo(t,2)))),r.a.createElement("hr",{className:"mp-results-line"}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-8"},l.totalInterestPaid),r.a.createElement("div",{className:"col-4 text-black"},o[o.length-1].totalInterest)),r.a.createElement("button",{className:"btn loan-btn-go-table",onClick:a.handleAmortizationAction},s?l.hideAmortizationBtnText:l.showAmortizationBtnText,r.a.createElement("i",{className:s?"arrow up":"arrow down"})))},a.handleDateChange=function(e){console.log(e),a.setState({startDate:e},function(){a.calculateAmortization()})};var n,o=g.getPossibleYears(50),l=(n=e.lan,P[n]),c=g.getMonthds(l.fullMonths);return a.state={lan:e.lan,translations:l,startDate:new Date,amount:5e3,years:3,months:36,interest:3,extra_monthly_amount:0,extra_yearly_amount:0,extra_lump_amount:0,extraYearlyMonths:c,extraLumpMonths:c,extraLumpYears:o,monthlyPayment:0,tableColumns:[l.monthYearText,l.paymentSingular,l.principalPaid,l.interestPaid,l.totalInterestText,l.balance+" "],tableResults:[],dateToFinish:new Date,showResults:!1,showAmortization:!1,showExtraPayments:!1,showEPayError:!1},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.calculateAmortization()}},{key:"scrollTo",value:function(e){b.scroller.scrollTo(e,{duration:800,delay:0,offset:-100,smooth:"easeInOutQuart"})}},{key:"render",value:function(){var e=this.state,t=e.amount,a=e.interest,n=e.years,o=e.months,l=e.translations,s=e.extra_monthly_amount,i=e.extra_yearly_amount,m=e.extra_lump_amount,c=e.extraYearlyMonths,u=e.extraLumpMonths,d=e.extraLumpYears,h=this.props,y=h.title,b=h.btnLabel;return r.a.createElement("div",{className:"container loan-calculator-wrapper"},r.a.createElement("div",{className:"row justify-content-center loan-form-container"},r.a.createElement("div",{className:"col-xs-12 col-sm-7 col-lg-5"},r.a.createElement("h3",{className:"loan-titles"},y||l.calculatorTitle),r.a.createElement("form",{id:"mbp-calculator",onSubmit:this.handleSubmit.bind(this)},r.a.createElement("div",{className:"row form-group mt-3"},r.a.createElement(N,{id:"biweekly_amount",label:l.loanAmount,name:"amount",value:t,icon:"$",iconPosition:"left",tooltipContent:l.amountHelpText,errorOccur:Number(t)<1||Number(t)>1e6||""===t?1:0,errorMsg:l.moneyFieldError,onChange:this.handleChange})),r.a.createElement("div",{className:"row no-gutters"},r.a.createElement("div",{className:"col-6 form-group mt-3"},r.a.createElement(T,{content:l.dateHelpText}),r.a.createElement("label",{htmlFor:"biweekly_years",className:"year-label"},l.termInYears),r.a.createElement("div",{className:"pr-2"},r.a.createElement("input",{id:"biweekly_years",name:"years",className:"form-control ".concat(n<1||n>100||""===n?"inputError":""),value:n>=1?n:"",onChange:this.handleTimeChange}))),r.a.createElement("div",{className:"col-6 form-group mt-3"},r.a.createElement("label",{htmlFor:"biweekly_months",className:"month-label pl-1"},l.termInMonths),r.a.createElement("div",{className:"pl-1"},r.a.createElement("input",{id:"biweekly_months",name:"months",className:"form-control ".concat(o<1||o>1200||""===o?"inputError":""),value:o>=1?o:"",onChange:this.handleTimeChange}))),r.a.createElement("div",{className:"col-12"},r.a.createElement("small",{className:"inputErrorText ".concat(n<1||n>100||""===n||o<1||o>1200||""===o?"show":"hide")},l.timeError))),r.a.createElement("div",{className:"row form-group mt-3"},r.a.createElement(N,{id:"ssc_interest",label:l.interestLabel,name:"interest",value:a,icon:"%",iconPosition:"right",tooltipContent:l.interestHelpText,errorOccur:Number(a)<=0||Number(a)>100||""===a?1:0,errorMsg:l.percentageFieldError,onChange:this.handleChange})),r.a.createElement("div",{className:"mt-4 mb-3"},r.a.createElement("button",{type:"submit",className:"btn btn-secondary btn-block",disabled:Number(t)<1||Number(t)>1e6||""===t||Number(n)<1||Number(n)>100||""===n||Number(o)<1||Number(o)>1200||""===o||Number(a)<=0||Number(a)>100||""===a},b)))),this.state.showResults&&this.state.monthlyPayment&&this.renderResults(),r.a.createElement("div",{className:"col-xs-12 col-xl-10 mt-2"},r.a.createElement("div",{className:"Collapsible"},r.a.createElement("div",{className:"Collapsible__trigger",onClick:this.handleExtraPaymentFields},this.state.showExtraPayments?r.a.createElement("span",null,l.hideExtraPayments," ",r.a.createElement("i",{className:"arrow up"})):r.a.createElement("span",null,l.showExtraPayments," ",r.a.createElement("i",{className:"arrow down"}))),r.a.createElement("div",{className:"container pb-4 Collapsible__contentOuter ".concat(this.state.showExtraPayments?"is-open":"is-closed")},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-12 mt-3 mb-3"},r.a.createElement("p",{className:"extra-fields-label"},l.extraPaymentsText1))),r.a.createElement("div",{className:"row form-group no-gutters extra-payments-row trbg-lblue"},r.a.createElement(T,{content:l.extraPaymentHelp1}),r.a.createElement("div",{className:"col-md-3"},r.a.createElement(N,{id:"extra_monthly_amount",name:"extra_monthly_amount",value:s,icon:"$",iconPosition:"left",onChange:this.handleChange})),r.a.createElement("div",{className:"col-sm-8 p-15"},r.a.createElement("label",{htmlFor:"extra_monthly_amount",className:"extra-fields-label dark-label"},l.extraPaymentLabel1))),r.a.createElement("div",{className:"row form-group no-gutters extra-payments-row mt-4 trbg-lsky"},r.a.createElement(T,{content:l.extraPaymentHelp2}),r.a.createElement("div",{className:"col-md-3"},r.a.createElement(N,{id:"extra_yearly_amount",name:"extra_yearly_amount",value:i,icon:"$",iconPosition:"left",onChange:this.handleChange})),r.a.createElement("div",{className:"col-md-6 p-15"},r.a.createElement("label",{htmlFor:"extra_yearly_amount",className:"extra-fields-label dark-label"},l.extraPaymentLabel2)),r.a.createElement("div",{className:"col-md-3"},r.a.createElement(L,{name:"extraYearlyMonths",list:c,handleBPSelect:this.handleBPSelect}))),r.a.createElement("div",{className:"row form-group no-gutters extra-payments-row mt-4 trbg-lgreen"},r.a.createElement(T,{content:l.extraPaymentHelp3}),r.a.createElement("div",{className:"col-md-3"},r.a.createElement(N,{id:"extra_lump_amount",name:"extra_lump_amount",value:m,icon:"$",iconPosition:"left",onChange:this.handleChange})),r.a.createElement("div",{className:"col-md-4 p-15"},r.a.createElement("label",{htmlFor:"extra_lump_amount",className:"extra-fields-label dark-label"},l.extraPaymentLabel3)),r.a.createElement("div",{className:"col-md-3"},r.a.createElement(L,{name:"extraLumpMonths",list:u,handleBPSelect:this.handleBPSelect})),r.a.createElement("div",{className:"col-md-2"},r.a.createElement(L,{name:"extraLumpYears",list:d,handleBPSelect:this.handleBPSelect}))),r.a.createElement("div",{className:"row form-group no-gutters ".concat(this.state.showEPayError?"show":"hide")},r.a.createElement("div",{className:"col-xs-12 text-right"},r.a.createElement("small",{className:"inputErrorText"},l.extraLumpError))),r.a.createElement("div",{className:"row form-group no-gutters extra-payments-row mt-3"},r.a.createElement("div",{className:"col-xs-12 offset-lg-5 col-sm-7 offset-lg-7 col-lg-5"},r.a.createElement("button",{type:"button",className:"btn btn-secondary btn-block btn-extra-fields",onClick:this.calculateAmortization,disabled:Number(t)<1||Number(t)>1e6||""===t||Number(n)<1||Number(n)>100||""===n||Number(o)<1||Number(o)>1200||""===o||Number(a)<=0||Number(a)>100||""===a},l.addExtraBtnTitle))))))),r.a.createElement("div",{id:"loanPaymentResults",style:{display:this.state.showResults&&this.state.showAmortization?"block":"none"}},r.a.createElement("div",{className:"row form-group mb-3"},r.a.createElement("div",{className:"col-xs-12 col-sm-6"},r.a.createElement("label",{htmlFor:"loan-start-date",className:"loan-label"},r.a.createElement(T,{content:l.startDateHelpText})," ",l.startDateText," *"),r.a.createElement(p.a,{id:"loan-start-date",className:"form-control",locale:this.state.lan,minDate:new Date,maxDate:g.getEndLimitDate(90),selected:this.state.startDate,onChange:this.handleDateChange,isClearable:!0,placeholderText:l.selectDatePlaceholder}),r.a.createElement("small",null,r.a.createElement("i",null,l.dateHelpMessage))),r.a.createElement("div",{className:this.state.startDate?"col-xs-12 col-sm-6 text-right":"hide"},r.a.createElement("div",{className:"pr-4"},r.a.createElement("h3",{className:"loan-titles"},l.estimatedPayoffDate),r.a.createElement("div",{className:"end-date-result"},l.fullMonths[this.state.dateToFinish.getMonth()]+" "+this.state.dateToFinish.getDate()+", "+this.state.dateToFinish.getFullYear())))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8 relative-loan-wrapper"},r.a.createElement(T,{content:l.amortizationTableHelp}),r.a.createElement("h3",null,l.amortizationSchedule)),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"with-extrapayment-text"},this.state.extra_monthly_amount||this.state.extra_yearly_amount||this.state.extra_lump_amount?l.withExtraPayments:l.withoutExtraPayments))),r.a.createElement("div",{className:"table-responsive scrolling-table underlined-tbody"},this.state.startDate&&r.a.createElement(k,{columns:this.state.tableColumns,data:this.state.tableResults})),r.a.createElement("p",{className:this.state.startDate?"hide":"show"},l.startingDateEmptyText)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),a=t.length>>>0;if("function"!==typeof e)throw new TypeError("predicate must be a function");for(var n=arguments[1],r=0;r<a;){var o=t[r];if(e.call(n,o,r,t))return r;r++}return-1},configurable:!0,writable:!0}),function(e){e.VTLoanCalculator={init:function(e){var t=e.selector,a=void 0===t?"vtLoanCalc":t,n=e.lan,o=void 0===n?"en":n,s=e.btnLabel,i=void 0===s?"Calculate":s,m=e.title,c=void 0===m?"":m,u=r.a.createElement(S,{lan:o,btnLabel:i,title:c});l.a.render(u,document.getElementById(a))}}}(window),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[141,1,2]]]);
//# sourceMappingURL=main.15aea052.chunk.js.map