import React from "react";
import PropTypes from "prop-types";
import { ChasingDots } from "better-react-spinkit";

const Loading = ({ size, color, showText, text }) => {
  return (
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
  );
};

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
