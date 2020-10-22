import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/BPProgress.css';

class Progress extends Component {
    constructor(props){
        super(props);

        this.state = {
            plWidth : ['20%', '40%', '60%', '80%', '100%'],
            steps:[
                {
                    icon: 'fal fa-dollar-sign',
                    title: { en: 'Annual Income', es: 'Ingresos anuales', ca: 'Annual Income', fr: 'Annual Income'},
                },
                {
                    icon: 'fal fa-percent',
                    title: { en: 'Percentage of Use', es: 'Porcentaje de uso', ca: 'Percentage of Use', fr: 'Percentage of Use'},
                },
                {
                    icon: 'far fa-abacus',
                    title: { en: 'Categorize your Spending', es: 'Clasifique sus gastos', ca: 'Categorize your Spending', fr: 'Categorize your Spending'},
                },
                {
                    icon: 'fal fa-calculator',
                    title: { en: 'Build a Budget', es: 'Construir Presupuesto', ca: 'Build a Budget', fr: 'Build a Budget'},
                },
                {
                    icon: 'fal fa-check',
                    title: { en: 'Results', es: 'Resultados', ca: 'Results', fr: 'Results'},
                },
            ]
        }
    }

    activationClass = (index) => {
        let classes = 'f1-step';
        if(this.props.activeStep === index){
            classes += ' active';
        }else{
            if(this.props.activeStep > index){
                classes += ' activated';
            }
        }

        return classes;
    }

    render() {
        const ProgressLine = styled.div`
            width: ${props => props.width};
        `;

        return (
            <div className="f1-steps">
                <div className="f1-progress">
                    <ProgressLine className="f1-progress-line" width={this.state.plWidth[this.props.activeStep]} />
                </div>

                {
                    this.state.steps.map( (item, index) => (
                        <div key={`steps_${index}`} className={ this.activationClass(index) } >
                            <div className="f1-step-icon">
                                <i className={item.icon}></i>
                            </div>
                            <p>{item.title[this.props.lan]}</p>
                        </div>
                    ))
                }
            </div>

        );
    }
}

export default Progress;