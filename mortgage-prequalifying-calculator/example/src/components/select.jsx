import React, { Component } from "react";
import "../styles/select.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.state.listOpen
        ? window.addEventListener("click", this.close)
        : window.removeEventListener("click", this.close);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.close);
  }

  close(timeOut) {
    this.setState({ listOpen: false });
  }

  selectItem(id) {
    this.setState( {listOpen: false}, this.props.handleBPSelect(id, this.props.name) );
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { listOpen } = this.state;
    const headerTitle = this.props.list.filter(item => item.selected)[0].title;
    //const headerSubTitle = this.props.list.filter(item => item.selected)[0].subtitle;

    let word_years = this.props.name !== 'downPayment' ? 'years' : '';
    if(this.props.lan === 'es'){
        word_years = this.props.name !== 'downPayment' ? 'años' : '';
    }

    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">
            <span>{headerTitle} {word_years}</span>
          </div>
          {listOpen ? (
            <i className="select-arrow up" />
          ) : (
            <i className="select-arrow down" />
          )}
        </div>
        {listOpen && (
          <ul className="dd-list" onClick={e => e.stopPropagation()}>
            {this.props.list.map(item => (
              <li
                className={
                  item.selected ? "dd-list-item selected" : "dd-list-item"
                }
                key={item.id}
                onClick={() => this.selectItem(item.id)}
              >
                <span>{item.title} {word_years}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;