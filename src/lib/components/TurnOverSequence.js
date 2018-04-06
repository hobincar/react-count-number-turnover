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
      const { delay, speed, children } = this.props;
      const { speeds } = this.state;

      let numberCounter = 0;
      for (let i = 0; i < speeds.length; i++) {
        if (isNaN(parseInt(children[i], 10))) continue;
        numberCounter += 1;

        setTimeout(() => {
          const newSpeeds = this.state.speeds.slice(0);
          newSpeeds[i] = speed;
          this.setState({ speeds: newSpeeds });
        }, numberCounter * delay);
      }

      this.setState({ animated: true });
    }
  }

  render() {
    const { children, visibilitySensorOn, springConfig, style } = this.props;
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
          >
            { () => numbers }
          </VisibilitySensor>
        ) : (
          numbers
        )
    )
  }
}

TurnOverSequence.defaultProps = {
  visibilitySensorOn: true,
  delay: 200,
  speed: 50,
  springConfig: {
    stiffness: 100,
    damping: 10,
  },
};

TurnOverSequence.propTypes = {
  visibilitySensorOn: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  springConfig: PropTypes.shape({
    stiffness: PropTypes.number.isRequired,
    damping: PropTypes.number.isRequired
  }).isRequired,
  style: PropTypes.object,
};

export default TurnOverSequence;
