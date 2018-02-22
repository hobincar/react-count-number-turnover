import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import TurnOverNumber from './TurnOverNumber';

class TurnOverSequence extends Component {
  constructor(props) {
    super(props);

    const { children } = this.props;
    this.state = {
      speeds: new Array(children.length).fill(0),
      animated: false,
    };
  }

  onVisible = isVisible => {
    if (isVisible && !this.state.animated) {
      const newSpeeds = this.state.speeds.slice(0);
      newSpeeds[0] = this.props.speed;
      this.setState({
        speeds: newSpeeds,
        animated: true,
      });
    }
  }

  render() {
    const { children, style } = this.props;
    const { speeds } = this.state;

    const numbers = [];
    children.split('').forEach((char, i) => {
      const number = Number.parseInt(char, 10);
      const start =
        Number.isNaN(number) ? char
        : number === 0 ? 9
        : number - 1;
      const end = Number.isNaN(number) ? char : number;

      numbers.push(
        <TurnOverNumber
          key={i}
          start={start}
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
          { end }
        </TurnOverNumber>
      );
    });

    return (
      <VisibilitySensor
        onChange={this.onVisible}
        partialVisibility={true}
      >
        { () => numbers }
      </VisibilitySensor>
    );
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
