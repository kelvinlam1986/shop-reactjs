import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChasingDots } from "better-react-spinkit";
import "./Loading.css";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: false };
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => this.setState({ showSpinner: true }),
      this.props.delay
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { size, color, showText, text } = this.props;
    return (
      this.state.showSpinner && (
        <div className="center-block" style={{ width: `${size + 0}px` }}>
          <div className="spacer_20" />
          {showText && (
            <small>
              <i>{text}</i>
            </small>
          )}
          <div className="spacer_20" />
          <ChasingDots size={size} color={color} />
        </div>
      )
    );
  }
}

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  showText: PropTypes.bool,
  text: PropTypes.string
};

Loading.defaultProps = {
  color: "#f9690e",
  size: 24,
  showText: false,
  text: "loading..."
};

export default Loading;
