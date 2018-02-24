import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import TurnOverNumber from './TurnOverNumber';

class TurnOverSequence extends Component {
  constructor(props) {
    super(props);

    const { children, visibilitySensorOn, speed } = this.props;
    const speeds = new Array(children.length).fill(0);
    if (!visibilitySensorOn)
      speeds[0] = speed;
    this.state = {
      speeds,
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

  onEndOfNumberAt = (i, speed, maxLength) => () => {
    const nextSpeeds = this.state.speeds.slice(0);
    nextSpeeds[i] = 0;
    if (i !== maxLength - 1) {
      nextSpeeds[i+1] = speed;
    }
    this.setState({
      speeds: nextSpeeds,
    });
  }

  render() {
    const { children, visibilitySensorOn, speed, springConfig, style } = this.props;
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
          visibilitySensorOn={false}
          start={start}
          speed={speeds[i]}
          springConfig={springConfig}
          onEnd={this.onEndOfNumberAt(i, speed, children.length)}
          style={style}
        >
          { end }
        </TurnOverNumber>
      );
    });

    return (
      visibilitySensorOn ?
        (
          <VisibilitySensor
            onChange={this.onVisible}
            partialVisibility={true}
            scrollCheck={true}
            resizeCheck={true}
          >
            { () => numbers }
          </VisibilitySensor>
        ) : (
          numbers
        )
    )
  }
}

TurnOverSequence.propTypes = {
  visibilitySensorOn: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  springConfig: PropTypes.shape({
    stiffness: PropTypes.number.isRequired,
    damping: PropTypes.number.isRequired
  }).isRequired,
  style: PropTypes.object,
};

TurnOverSequence.defaultProps = {
  visibilitySensorOn: true,
  speed: 50,
  springConfig: {
    stiffness: 100,
    damping: 10,
  },
};

export default TurnOverSequence;
