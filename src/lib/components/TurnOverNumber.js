import React  from 'react';
import PropTypes from 'prop-types';
import TextLoop from './TextLoop';

const TurnOverNumber = ({ children, start, speed, springConfig, onEnd, style }) => {
  if (start === children) {
    return (
      <TextLoop
        speed={speed}
        springConfig={{ stiffness: 180, damping: 8 }}
        nCall={1}
        onEnd={onEnd}
        style={style}
      >
        { children }
      </TextLoop>
    );
  }

  if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(start)) {
    throw "'start' prop should be a digit(0~9)";
  }

  const end = Number.parseInt(children, 10);
  if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(end)) {
    throw "Number should be a digit(0~9)";
  }

  const numbers = [];
  if (start > end) {
    numbers.push(
      <span key={start}>{ start }</span>
    );
    numbers.push(
      <span key={end}>{ end }</span>
    );
  } else {
    for (let i = start; i <= end; i += 1) {
      numbers.push(
        <span key={i}>{ i }</span>
      );
    }
  }

  return (
    <TextLoop
      speed={speed}
      springConfig={springConfig}
      nCall={start > end ? 2 : end - start + 1}
      onEnd={onEnd}
      style={style}
    >
      { numbers }
    </TextLoop>
  );
};

TurnOverNumber.propTypes = {
  start: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  speed: PropTypes.number.isRequired,
  springConfig: PropTypes.shape({
    stiffness: PropTypes.number.isRequired,
    damping: PropTypes.number.isRequired
  }).isRequired,
  onEnd: PropTypes.func,
  style: PropTypes.object,
};

TurnOverNumber.defaultProps = {
  start: 0,
  speed: 100,
  springConfig: {
    stiffness: 100,
    damping: 10,
  },
};

export default TurnOverNumber;
