import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import TurnOverNumber from './TurnOverNumber';

class TurnOverSequence extends Component {
  constructor(props) {
    super(props);

    const { children, speed } = this.props;
    const speeds = new Array(children.length).fill(0);
    speeds[0] = speed;
    this.state = { speeds };
  }

  render() {
    const { children, style } = this.props;
    const { speeds } = this.state;

    const numbers = [];
    children.split('').forEach((number, i) => {
      number = Number.parseInt(number, 10);
      const prevNumber = number === 0 ? 9 : number - 1;

      numbers.push(
        <TurnOverNumber
          key={i}
          start={prevNumber}
          speed={speeds[i]}
          onEnd={() => this.setState((prevState, props) => {
            const nextSpeeds = prevState.speeds;
            nextSpeeds[i] = 0;
            if (i !== children.length - 1) {
              nextSpeeds[i+1] = props.speed;
            }
            return {
              speeds: nextSpeeds,
            };
          })}
          style={style}
        >
          { number }
        </TurnOverNumber>
      );
    });

    return numbers;
  }
}

TurnOverSequence.propTypes = {
  children: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  style: PropTypes.object,
};

TurnOverSequence.defaultProps = {
  speed: 50,
};

export default TurnOverSequence;
