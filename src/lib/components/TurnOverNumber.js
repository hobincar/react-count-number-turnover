import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import TextLoop from './TextLoop';

class TurnOverNumber extends Component {
  constructor(props) {
    super(props);

    const { visibilitySensorOn, speed } = this.props;
    this.state = {
      speed: visibilitySensorOn ? 0 : speed,
      animated: false,
    };
  }

  onVisible = isVisible => {
    if (isVisible && !this.state.animated) {
      const { speed } = this.props;
      this.setState({
        speed,
        animated: true,
      });
    }
  }

  render() {
    const { children, visibilitySensorOn, start, springConfig, onEnd, style } = this.props;
    const speed = visibilitySensorOn ? this.state.speed : this.props.speed;

    if (start === children) {
      return (
        <TextLoop
          speed={speed}
          nCall={0}
          onEnd={onEnd}
          style={style}
        >
          { children }
        </TextLoop>
      );
    }

    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(start)) {
      throw new Error("'start' prop should be a digit(0~9)");
    }

    const end = Number.parseInt(children, 10);
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(end)) {
      throw new Error("Number should be a digit(0~9)");
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
      visibilitySensorOn ?
        (
          <VisibilitySensor
            onChange={this.onVisible}
            partialVisibility={true}
            scrollCheck={true}
            resizeCheck={true}
          >
            {
              () => (
                <TextLoop
                  speed={speed}
                  springConfig={springConfig}
                  nCall={start > end ? 1 : end - start}
                  onEnd={onEnd}
                  style={style}
                >
                  { numbers }
                </TextLoop>
              )
            }
          </VisibilitySensor>
        ) : (
          <TextLoop
            speed={speed}
            springConfig={springConfig}
            nCall={start > end ? 1 : end - start}
            onEnd={onEnd}
            style={style}
          >
            { numbers }
          </TextLoop>
        )
    );
  }
}

TurnOverNumber.propTypes = {
  visibilitySensorOn: PropTypes.bool.isRequired,
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
  visibilitySensorOn: true,
  start: 0,
  speed: 100,
  springConfig: {
    stiffness: 100,
    damping: 10,
  },
};

export default TurnOverNumber;
