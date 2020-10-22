import React, { Component } from "react";
import Util from "./Utils";
import { Container, Row, Col } from "react-bootstrap";
import './styles/general.css';

import Progress from './components/BPProgress';
import Dropdown from "./components/BPSelect";
import InputG from "./components/BPInputGroup";
import RangeSlider from "./components/BPRangeSlider";
import BPTabs from './components/BPTabs';
import BPResult from './components/BPResult';
import { scroller } from 'react-scroll';
import getTranslations from './language';

class App extends Component {
  constructor(props) {
    super(props);

    this.translations = getTranslations(this.props.initObj.lan);
    this.state = this.props.initObj;
  };

  handlerIncomeChange = e => {
    const income = Util.removeMoneyTrash(e.target.value);
    let percentageList_aux = [...this.state.percentageList];

    if( Util.valueIsInteger(income) && income < 1000000 ){
      percentageList_aux.forEach(
        item => (
            item.subtitle = "$" + Util.formatMoney( Util.calculatePercent(Util.removePercentage(item.title), income) )
        )
      );
      this.setState({ income, percentageList: percentageList_aux });
    }
  };


  handleBPSelect = id => {
    //Updating List of Percentages
    let tempPer = JSON.parse(JSON.stringify(this.state.percentageList));
    tempPer.forEach(item => (item.selected = false));
    tempPer[id].selected = true;
    const moneyAvailable = Util.removeMoneyTrash(tempPer[id].subtitle);

    //Updating List of Categories
    let tempCats = [...this.state.categories];

    tempCats.forEach(
      cat => {
        const available = Util.calculatePercent(cat.value, moneyAvailable);
        cat.moneyValue = available;
        cat.moneyBudget = available;
      }
    );

    this.setState({
      percentageList: tempPer,
      available: moneyAvailable,
      categories: tempCats
    });
  };

  handleSlide = (render, handle, value, un, percent, id) => {
    const c_value = value[1];
    let aux_list = [...this.state.categories];
    let total = 0;
    aux_list.forEach(
      item => {
          if(item.title === id){
            item.value = c_value <= item.limit ? c_value : c_value-1 ;
            const available = Util.calculatePercent(item.value, this.state.available);
            item.moneyValue = available;
            item.moneyBudget = available;
          }

          total += item.value;
      }
    );

    const n_limit = 100-total;
    aux_list.forEach(
      item => {
          const c = item.value+n_limit;
          item.limit = c;
      }
    );
    this.setState({categories : aux_list});
  };

  handleSliderClickAction = (sliderId, action) => {
    let aux_list = [...this.state.categories];
    let total = 0;

    if(action==='add'){
        aux_list.forEach(
          item => {
              if(item.title === sliderId){
                const c_value = item.value;
                item.value = c_value < item.limit ? c_value+1 : c_value ;
                const available = Util.calculatePercent(item.value, this.state.available);
                item.moneyValue = available;
                item.moneyBudget = available;
              }

              total += item.value;
          }
        );
    }else{
        aux_list.forEach(
          item => {
              if(item.id === sliderId && item.value > 0){
                item.value -= 1;
                const available = Util.calculatePercent(item.value, this.state.available);
                item.moneyValue = available;
                item.moneyBudget = available;
              }

              total += item.value;
          }
        );
    }

    const n_limit = 100-total;
    aux_list.forEach(
      item => {
          const c = item.value+n_limit;
          item.limit = c;
      }
    );

    this.setState({categories : aux_list});
  }

  getRangeSliderClasses = () => {
    const cont = this.state.categories.length;
    const spaces = [
      "col",
      "col-xs-12 col-sm-6",
      "col-xs-12 col-sm-6 col-md-4",
      "col-xs-12 col-sm-6 col-md-4 col-lg-3",
      "col-xs-12 col-sm-6 col-md-4 col-lg-2 col-lg-20",
      "col-xs-12 col-sm-6 col-md-4 col-lg-2"
    ];
    const str_class = cont < 7 ? spaces[cont - 1] : spaces[spaces.length - 1];

    return str_class;
  };

  handleCategoryChange = cat => {
    const categories = [...this.state.categories];
    categories.forEach(item => {
      if(item.title === cat.title){
        item = cat;
      }
    });
    this.setState({categories});
  }

  calculateRealExpenses = () => {
    const categories = [...this.state.categories];
    let expenses = 0;
    categories.forEach(item => {
      item.rows.forEach(row => expenses += parseFloat(row.amount) )
    });

    return Util.roundTo(expenses, 2);
  }

  handleStepChange = (action) => {
    let activeStep = this.state.activeStep;

    if(action === 'next'){

        let categories = [...this.state.categories];
        if(activeStep === 0){
          const id = this.state.percentageList.filter(item => item.selected)[0].id;
          this.handleBPSelect(id);
        }

        if( activeStep === 2){
          categories.forEach(cat => cat.rows.forEach(item => item.amount = 0) );
        }

        activeStep++;
        this.setState({activeStep, categories});

    }else{
        activeStep--;
        this.setState({activeStep});
    }

    if( activeStep === 3){
      this.scrollTo('myRefToGoTo');
    }

  }

  isAnyTabDisabled = () =>{
    const list = this.state.categories;
    let flag = false;
    list.forEach(item => {
        if(item.moneyBudget < 0){
            flag = true;
        }
    });

    return flag;
  }

  isThereAnyExpense = () =>{
    const list = this.state.categories;
    let counter = 0;

    list.forEach(item => {
        item.rows.forEach( subItem => counter += Number(subItem.amount) )
    });

    if(counter)
      return false;
    else
      return true;
  }

  isAnyBudgetAvailable = () =>{
    const counter = this.claculateTotalBudget();

    if(counter && counter !== '0.00')
      return true;
    else
      return false;
  }

  claculateTotalBudget = () =>{
      const list = this.state.categories;
      let counter = 0;

      list.forEach(item => {
        counter += Number(item.moneyValue) ;
      });

      return Util.roundTo(counter, 2);
  }

  disableNextBtn = () => {
    const {activeStep, income} = this.state;

    if( (activeStep === 0 && (income === '-' || income === '' || parseFloat(income) <= 1) )
     || (activeStep === 2 && !this.isAnyBudgetAvailable() )
     || (activeStep === 3 && (this.isAnyTabDisabled() || this.isThereAnyExpense()) ) ){
      return true
    }

    return false;
  }

  calculateTBRemaining = () => {
    const selectedPercernt = this.state.percentageList.filter(item => item.selected);
    const totalSelected = Util.removeMoneyTrash(selectedPercernt[0].subtitle);
    const totalBFromSliders = this.claculateTotalBudget();
    const subst = totalSelected-totalBFromSliders;
    const result = subst < 0.1 ? 0 : subst;

    return Util.roundTo( result, 2);
  }

  printResults = (elem) => {
    var content = document.getElementById(elem).innerHTML;
    var mywindow = window.open('', 'Print', 'height=700,width=900');

    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body>');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();

    return true;
  }

  // Run this method to execute scrolling.
  scrollTo(selector) {
      scroller.scrollTo(selector, {
        duration: 800,
        delay: 0,
        offset: 150,
        smooth: 'easeInOutQuart',
      })
  }

  render() {
    const { percentageList, stepsInfo, categories } = this.state;
    return (
      <Container>
        <Row>
            <div className="budget-planner-wrapper">
              <Progress activeStep={this.state.activeStep} lan={this.props.initObj.lan} onClick={this.handleProgressEvent}/>
              <div id="myRefToGoTo"/>

              {/* ------- Income Field (Step #1) ------------------------------------------------------------------ */}
              <fieldset className={ (this.state.activeStep === 0) ? 'active' : '' }>
                <Row className="mt-5 xs-row-separator">
                  <Col>
                      <h3 className="mb-4 step-title text-center">{stepsInfo[0].title}</h3>
                      <p>{stepsInfo[0].content}</p>
                    </Col>
                </Row>

                <Row className="mt-5">
                  <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <InputG
                      id="annual_income"
                      lan={this.props.initObj.lan}
                      label={this.translations.grossAnnualIncome}
                      value={this.state.income !== '-' ? Util.formatMoney(this.state.income) : '' }
                      ariaLabel={this.translations.enterAnualIncome}
                      placeholder={this.translations.enterAnualIncome}
                      iconClass="far fa-dollar-sign"
                      errorOccur={(Number(this.state.income) < 1 || Number(this.state.income) > 999999 || this.state.income === '') ? 1 : 0}
                      errorMsg={this.translations.incomeFieldError}
                      onChange={this.handlerIncomeChange}
                    />
                  </div>
                </Row>
              </fieldset>{/* -- End of Step #1 -- */}

              {/* ------- Select Percentage (Step #2) ------------------------------------------------------------- */}
              <fieldset className={ (this.state.activeStep === 1) ? 'active' : '' }>
                <Row className="mt-5 xs-row-separator">
                  <Col>
                      <h3 className="mb-5 step-title text-center">{stepsInfo[1].title}</h3>
                      <p>{stepsInfo[1].content}</p>
                    </Col>
                </Row>

                <Row className="mt-5">
                  <Col className="col-12 col-md-6 offset-md-3 col-lg-5 offset-lg-4 col-xl-4 offset-xl-4">
                    <label className="formLabel material-label">{this.translations.percentageBaseonIncome}</label>
                    <Dropdown
                      list={percentageList}
                      handleBPSelect={this.handleBPSelect}
                    />
                  </Col>
                </Row>
              </fieldset>{/* -- End of Step #2 -- */}

              {/* ------- Range Sliders (Step #3) ------------------------------------------------------------------ */}
              <fieldset className={ (this.state.activeStep === 2) ? 'active' : '' }>
                <Row className="mt-5 xs-row-separator">
                  <Col>
                      <h3 className="mb-5 step-title text-center">{stepsInfo[2].title}</h3>
                      <p>{stepsInfo[2].content}</p>
                    </Col>
                </Row>

                <Row className="mt-1 mb-4">
                  <Col>
                    <div className="alert alert-warning info-text" role="alert">
                      <small>
                          <i className="fas fa-info-square mr-2"></i> {this.translations.slidersRangeNote}</small>
                      </div>
                  </Col>
                </Row>

                <Row className="justify-content-center no-gutters">
                  {categories.map(category => (
                    <div
                      className={this.getRangeSliderClasses()}
                      key={category.title}
                    >
                      <RangeSlider
                        category={category}
                        onSlide={this.handleSlide}
                        onClick={this.handleSliderClickAction}
                      />
                    </div>
                  ))}
                </Row>

                <Row className="mt-4">
                  <Col>
                    <h4 className="label-results text-right">
                      {this.translations.budgetRemaining}: <span>${ Util.formatMoney(this.calculateTBRemaining()) }</span>
                    </h4>
                    <h4 className="label-results text-right">
                      {this.translations.totalBudget}: <span>${ Util.formatMoney(this.claculateTotalBudget()) }</span>
                    </h4>
                  </Col>
                </Row>
              </fieldset>{/* -- End of Step #3 -- */}

              {/* ------- Tabs (Step #4) ---------------------------------------------------------------------------- */}
              <fieldset className={ (this.state.activeStep === 3) ? 'active' : '' }>
                <Row className="mt-5 xs-row-separator">
                  <Col>
                      <h3 className="mb-5 step-title text-center">{stepsInfo[3].title}</h3>
                      <p>{stepsInfo[3].content}</p>
                    </Col>
                </Row>

                <BPTabs lan={this.props.initObj.lan} list={categories.filter(item => item.moneyValue > 0 )} onChange={this.handleCategoryChange} />

                <hr/>
              </fieldset>{/* -- End of Step #4 -- */}

              {/* ------- Result (Step #5) -------------------------------------------------------------------------- */}
              <fieldset id="printWrapper" className={ (this.state.activeStep === 4) ? 'active' : '' }>
                  <Row className="mt-5 xs-row-separator">
                    <Col>
                        <h3 className="mb-5 step-title text-center">{stepsInfo[4].title}</h3>
                        <p>{stepsInfo[4].content}</p>
                      </Col>
                  </Row>

                  <Row>
                    <Col>
                      <h4 className="label-results">{this.translations.yourIncome}: <span>${ Util.formatMoney(this.state.income) }</span></h4>
                      <h4 className="label-results">{this.translations.budgetBaseOnIncome}: <span>{this.state.percentageList.filter(item=>item.selected)[0].subtitle}</span></h4>
                    </Col>
                  </Row>

                  <Row className="mt-3 mb-3">
                    <Col>
                      <h2 className="text-center mt-2">{this.translations.distributionExpensesActivity}</h2>
                    </Col>
                  </Row>

                  {
                    categories.map( cat => {
                        return (cat.moneyValue !== cat.moneyBudget) ? <BPResult lan={this.props.initObj.lan} key={`bp_result_${cat.id}`} cat={cat} /> : false;
                      }
                    )
                  }

                  <Row className="mt-3 mb-3">
                    <Col className="text-center">
                      <h2 className="label-results">{this.translations.realMoneyToExpend}: <span>${ Util.formatMoney(this.calculateRealExpenses()) }</span></h2>
                    </Col>
                  </Row>
              </fieldset>{/* -- End of Step #5 -- */}

              <div className="f1-buttons mt-5">
                  <button
                    className="btn btn-previous"
                    style={{display: (this.state.activeStep === 0) ? 'none' : 'inline' }}
                    onClick={() => this.handleStepChange('prev')}
                  >
                    <i className="fal fa-angle-double-left"></i> {this.translations.previous}
                  </button>

                  <button
                    className="btn btn-next btn-primary"
                    style={{display: (this.state.activeStep === 4) ? 'none' : 'inline' }}
                    onClick={() => this.handleStepChange('next')}

                    disabled={this.disableNextBtn() ? true : false}
                  >
                    { this.state.activeStep === 3 ? this.translations.submit : this.translations.next }
                  </button>

                  <button
                    className="btn btn-primary btn-print-result"
                    onClick={() => this.printResults('printWrapper')}
                    style={{display: (this.state.activeStep === 4) ? 'inline' : 'none' }}
                  >
                    <i className="fal fa-print mr-2"></i>{this.translations.print}
                  </button>
              </div>

            </div>
        </Row>
      </Container>

    );
  }
}

export default App;