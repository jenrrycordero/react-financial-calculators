import React, { Component } from 'react';
import Chart from "react-google-charts";

class DoughnutChart extends Component {
	render() {
        const strTranslations = {
            en : {
                "monthly_payment" : "Monthly Payment",
                "principal_interest" : "Principal & Interest",
				"insurance" : "Homeowner's Insurance & Taxes",
				"tax" : "Property tax",
            },
            es : {
                "monthly_payment" : "Pago Mensual",
                "principal_interest" : "Principal e Intereses",
				"insurance" : "Seguro e Impuestos del Propietario",
				"tax" : "Impuestos",
            },
            ca : {
                "monthly_payment" : "Monthly Payment",
                "principal_interest" : "Principal & interest",
				"insurance" : "Homeowner's Insurance & Taxes",
				"tax" : "Property tax",
            },
            fr : {
                "monthly_payment" : "Paiement mensuel",
                "principal_interest" : "L'interet principal",
				"insurance" : "L'assurance habitation",
				"tax" : "Taxe de propriété",
            },

        };

        const lan = this.props.lan;

        const currentLanguage = strTranslations[lan];

        const principal = parseFloat(this.props.principal);
        const insurance = parseFloat(this.props.insurance);
        const taxes = parseFloat(this.props.taxes);

        /* const totalMonthly = Util.formatMoney( Util.roundTo(principal + insurance + taxes, 0) ); */

/* 		const options = {
			animationEnabled: true,
			subtitles: [{
				text: `$${this.props.total}`,
				verticalAlign: "center",
				fontSize: 40,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "'$'#,###",
				dataPoints: [
					{ name: currentLanguage.principal_interest, y: principal },
					{ name: currentLanguage.insurance, y: insurance },
					{ name: currentLanguage.tax, y: taxes },
				]
			}]
        } */

        const data = [
            ["Mortgage", "Monthly Payments"],
            [currentLanguage.principal_interest, principal],
            [currentLanguage.insurance, insurance],
            [currentLanguage.tax, taxes],
        ];
        const options = {
            title: "",
            pieHole: 0.6,
            slices: [
                {
                  color: "#4f81bc"
                },
                {
                  color: "#c0504e"
                },
                {
                  color: "#9bbb58"
                }
            ],
            /* legend: {
                position: "bottom",
                alignment: "center",
                textStyle: {
                  color: "233238",
                  fontSize: 14
                }
            }, */
            legend: 'none',
            is3D: false
        };

		return (
            <div className="chart-wrap">
                {/* <CanvasJSChart options = {options} /> */}
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                    legendToggle
                />
                <div className="centered-absolutely total-monthly-payment">{`$${this.props.total}`}</div>
                <h4 className="centered-absolutely">{currentLanguage.monthly_payment}</h4>
            </div>
        );
	}
}

export default DoughnutChart;