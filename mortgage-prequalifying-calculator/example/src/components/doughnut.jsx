import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

export default class DoughnutChart extends Component {

    render() {
        const data = {
            labels: [
                'Principal & interest',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [1750, 150, 50],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };

        return (<Doughnut data={data} />);
  }

};
