import React, { Component } from 'react';

class Tooltip extends Component{

    constructor(props) {
        super(props)
        this.state = { hover: false }
    }

    handleMouseInOut() {
        this.setState({ hover: !this.state.hover })
    }

    handleTooltip() {
        this.setState({ hover: !this.state.hover })
    }

    render() {
        return(
            <div className={`tooltipContainer ${this.props.className}`}>
                <div
                    className='helpMiniDisk'
                    onClick={this.handleTooltip.bind(this)}
                    onMouseOver={this.handleMouseInOut.bind(this)}
                    onMouseOut={this.handleMouseInOut.bind(this)}
                >?</div>
                <div className="customTooltip" style={{visibility: this.state.hover ? 'visible' : 'hidden' }}>{this.props.content}</div>
            </div>
        )
    }
}
export default Tooltip;