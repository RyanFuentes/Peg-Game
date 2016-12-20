import React, {Component} from 'react';

import '../styles/buttonSlide.scss';

export default class ButtonSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
    this.cancelTimeoutHandler();
  };

  handleSubButtonClick = (handler) => {
    this.setState({open: false});
    handler();
  };

  setTimeoutHandler = () => {
    this.timeoutHandler = setTimeout(()=> this.setState({open: false}), 3000);
  };

  cancelTimeoutHandler = () => {
    clearTimeout(this.timeoutHandler);
  };

  render() {
    return (
      <div
        className="button-slide"
        onMouseLeave={this.setTimeoutHandler}>
        <button className="button-slide-main" onClick={this.handleToggle}>{this.props.title}</button>
        <div
          className={'button-slide-menu ' + (this.state.open ? 'open' :'closed')}
          onMouseEnter={this.cancelTimeoutHandler}>
          {this.props.options.map(o => (
            <button
              onClick={this.handleSubButtonClick.bind(null, o.onClick)}
              key={o.title}>
              {o.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
