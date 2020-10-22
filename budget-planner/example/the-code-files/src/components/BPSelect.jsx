import React, { Component } from "react";
import "../styles/BPSelect.css";

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
    this.setState({listOpen: false}, this.props.handleBPSelect(id));
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { listOpen } = this.state;
    const headerTitle = this.props.list.filter(item => item.selected)[0].title;
    const headerSubTitle = this.props.list.filter(item => item.selected)[0].subtitle;

    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()} tabIndex="2">
          <div className="dd-header-title">
            <span>
              {headerTitle} <small>{`(${headerSubTitle})`}</small>
            </span>
          </div>
          {listOpen ? (
            <i className="fal fa-angle-up" />
          ) : (
            <i className="fal fa-angle-down" />
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
                <span>
                  {item.title} <small>{`(${item.subtitle})`}</small>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;