import React, { Component } from 'react';
import { Row, Col, Tab, Nav } from "react-bootstrap";
import '../styles/BPTabs.css';
import styled from 'styled-components';
import Table from './BPTable.jsx';
import Util from "../Utils.js";

class BPTabs extends Component {
    constructor (props){
        super(props);

        this.languages = {
            en: {
                availableBudget : "available budget",
                totalBudget: "total budget",
                previousCat: "Previous Category",
                nextCat: "Next Category",
                remainingTotal: "Remaining Total",
            },
            es: {
                availableBudget : "Presupuesto disponible para",
                totalBudget: "Presupuesto total de",
                previousCat: "Categoría Anterior",
                nextCat: "Siguiente Categoría",
                remainingTotal: "Total Restante",
            },
            ca: {
                availableBudget : "available budget",
                totalBudget: "total budget",
                previousCat: "Previous Category",
                nextCat: "Next Category",
                remainingTotal: "Remaining Total",
            },
            fr: {
                availableBudget : "available budget",
                totalBudget: "total budget",
                previousCat: "Previous Category",
                nextCat: "Next Category",
                remainingTotal: "Remaining Total",
            }
        }

        this.translations = this.languages[this.props.lan];
        this.state = { tabKey: 0 };
    }

    handleSelect = tabKey => {
        this.setState({tabKey});
    }

    handleCatChange = e => {
        const tabIndex = e.target.getAttribute('data-rb-event-key');
        this.setState({tabKey:tabIndex});
    }

    isAnyTabDisabled = (props) =>{
        const list = this.props.list;
        let flag = false;
        list.forEach(item => {
            if(item.moneyBudget < 0){
                flag = true;
            }
        });

        return flag;
    }

    calculateRemainingTotal = (props) =>{
        const list = this.props.list;
        let totalBudget = 0
        list.forEach(item=>{
            totalBudget += Number(item.moneyValue);
        });

        let totalInserted = 0;
        list.forEach(item=>{
            item.rows.forEach(row=>{
                totalInserted += (row.amount==='') ? 0 : Number(row.amount);
            })
        });

        return totalBudget-totalInserted;
    }

    render() {

        /* Styles */
        const TabNav = styled.div`
            .nav-link{
                color: #267cac
            }
            .nav-link.active, .nav-link:hover{
                color: #ffffff !important;
                background: ${props => props.color};
            }

            .nav-link.disabled, .nav-link.disabled:hover {
                color: #6c757d;
            }
        `;
        const BPTabContent = styled.div`
            h3{
                color:  ${props => props.color};

                i{
                    color: ${props => props.color};
                    border: 3px solid ${props => props.color};
                }
            }

            .table-responsive{
                table thead tr th{
                    border: none;
                    color: #ffffff;
                    font-size: 21px;
                    font-weight: 400;
                    padding: 10px 10px 10px 13px;
                    border-right: 1px solid #e6e6e6;
                    text-shadow: 0 1px 1px #000;
                    background: ${props => props.color};
                }
            }

            button{
                color: #ffffff;
                border: 1px solid #ced4da;
                background: ${props => props.color};
            }

            .form-control.btn-add-row:focus{
                color: #ffffff;
                background: ${props => props.color};
            }
        `;

        const list = this.props.list;

        return (
            <Tab.Container activeKey={this.state.tabKey} onSelect={this.handleSelect}>
                <Row>
                    <Col md={3} className="vertical-tabs-border">
                        <Nav variant="pills" className="flex-column">
                            {list.map((item, index) =>(
                                <Nav.Item key={`nav_${item.id}`} className={ this.isAnyTabDisabled() ? 'nav-diabled' : ''}>
                                    <TabNav color={item.color}><Nav.Link onClick={this.handleCatChange.bind(this)} eventKey={index} disabled={ this.isAnyTabDisabled() } ><i className={item.icon}></i> {item.title}</Nav.Link></TabNav>
                                </Nav.Item>
                            ))}
                        </Nav>

                        <hr />
                    </Col>
                    <Col md={9} className="BP-left-tabs">
                        <Tab.Content>
                            {list.map( (item, index) =>(
                                <Tab.Pane eventKey={index} key={`pane_${item.id}`}>

                                    <BPTabContent color={item.color} key={`tab_${item.id}`} >
                                        <h3><i className={item.icon}></i> {item.subtitle}</h3>
                                        <p>{item.content}</p>

                                        <Table lan={this.props.lan} cat={item} onChange={this.props.onChange} key={`table_${item.id}`} />

                                        <h4 className="label-results text-right">
                                            { this.props.lan === 'es' ? `${this.translations.availableBudget} ${item.title}` : `${item.title} ${this.translations.availableBudget}` }:
                                            <span className={item.moneyBudget < 0 ? 'atention' : 'remaining-sub-budget' }> ${ Util.formatMoney( Util.roundTo(item.moneyBudget, 2) ) }</span>
                                        </h4>
                                        <h4 className="label-results text-right">
                                            { this.props.lan === 'es' ? `${this.translations.totalBudget} ${item.title}` : `${item.title} ${this.translations.totalBudget}` }:
                                            <span className="remaining-sub-budget"> ${ Util.formatMoney(item.moneyValue) }</span>
                                        </h4>
                                    </BPTabContent>

                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>

                <Row className="mb-5 categories-btn-container">
                    <Col md={{ span: 9, offset: 3 }} >
                        <button
                            disabled={ this.isAnyTabDisabled() }
                            className={Number(this.state.tabKey) !== 0 ? 'btn btn-update-tabs btn-prev-tab mr-2 mb-2' : 'd-none'}
                            onClick={() => this.handleSelect(Number(this.state.tabKey)-1)}
                        >
                            <i className="fal fa-angle-double-left"></i> &nbsp;{this.translations.previousCat}
                        </button>
                        <button
                            disabled={ this.isAnyTabDisabled() }
                            className={Number(this.state.tabKey) === list.length-1 ? 'd-none' : 'btn btn-update-tabs btn-next-tab mb-2' }
                            onClick={() => this.handleSelect(Number(this.state.tabKey)+1)}
                        >
                            {this.translations.nextCat} &nbsp;<i className="fal fa-angle-double-right"></i>
                        </button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4 className="label-results text-right">
                            {this.translations.remainingTotal}:
                            <span className={this.calculateRemainingTotal() < 0 ? 'atention' : '' }> ${ Util.formatMoney( Util.roundTo(this.calculateRemainingTotal(), 2) ) }</span>
                        </h4>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }/* End of render() */

}

export default BPTabs;