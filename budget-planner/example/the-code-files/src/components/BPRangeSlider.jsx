import React, { Component } from 'react';
import Nouislider from "nouislider-react";
import Util from '../Utils';
import "nouislider/distribute/nouislider.css";
import '../styles/BPRangeSlider.css';
import styled from 'styled-components';

class RangeSlider extends Component {

    render() {
        /* Style */
        const RangeSliderWrapper = styled.div`
            .range-action{
                color: ${props => props.color};
            }
            .range-title, .noUi-connect{
                background: ${props => props.color};
            }

            .percent-xs{
                background-color: ${props => props.color};
                &:before{
                    border-color: ${props => props.color};
                }
            }

            .noUi-handle {
                background-color: ${props => props.color};
                background-image: -webkit-linear-gradient(top, ${props => props.color}, ${props => props.darkercolor});
                background-image: -o-linear-gradient(top, ${props => props.color} 0, ${props => props.darkercolor} 100%);
                background-image: linear-gradient(180deg, ${props => props.color} 0, ${props => props.darkercolor});
                background-repeat: repeat-x;
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=${props => props.color}, endColorstr=${props => props.darkercolor}, GradientType=0);
                filter: none;

                -webkit-box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
                -moz-box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
                box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);

                border: 0 solid transparent;
            }

            .noUi-tooltip {
                background-color: ${props => props.color};

                &:after{
                    border-color: transparent transparent ${props => props.darkercolor} ${props => props.color};
                }
            }
        `;
        /* End of Style */

        const { category, onSlide, onClick } = this.props;
        const sliderId = category.id;

        return (
            <div className="rangePaddingWrapper">
                <RangeSliderWrapper className="range-slider-wrapper mb-2" color={category.color} darkercolor={category.darkercolor}>
                    <div className="range-title">
                        <i className={category.icon}></i><br />
                        {category.title}
                    </div>
                    <div className="range-price">${Util.formatMoney(category.moneyValue)}</div>
                    <div className="percent-xs">{category.value}%</div>
                    <div className="form-group" id={`div4${sliderId}`}>
                        <label htmlFor={sliderId}><span className="sr-only">{sliderId}</span></label>
                        <i className={`fas fa-minus-square range-action range-minus ${category.value < 1 && 'disabled'}`} onClick={() => onClick(sliderId, 'sub')}></i>

                        <Nouislider
                            id={sliderId}
                            connect
                            step={1}
                            value={[0, category.value]}
                            start={[0, category.value]}
                            behaviour="drag"
                            range={{
                                min: [0],
                                max: [100]
                            }}
                            limit = { category.value < category.limit ? category.limit : category.limit+1 }
                            onSlide={(render, handle, value, un, percent) => onSlide(render, handle, value, un, percent, category.title)}
                            tooltips={true}
                            format={{
                                to: function (value) {
                                    return value + '%';
                                },
                                from: function (value) {
                                    return value.replace('%', '');
                                }
                            }}
                            accessibility
                        />

                        <i className={ `fas fa-plus-square range-action range-plus ${ (category.value === category.limit || category.value === 100) && 'disabled'}`} onClick={() => onClick(category.title, 'add')}></i>
                    </div>
                </RangeSliderWrapper>
            </div>
        );
    }
}

export default RangeSlider;