import React from 'react';
import { TurnOverNumber, TurnOverSequence } from '../lib';

const App = () => (
  <React.Fragment>
    <TurnOverSequence
      visibilitySensorOn={true}
      delay={200}
      speed={50}
      springConfig={{
        stiffness: 100,
        damping: 10,
      }}
      style={{
        fontSize: '60px',
        fontWeight: 300,
        color: '#1f4d6a',
        marginTop: '50px',
      }}
    >
      123,123,123
    </TurnOverSequence>
    <br />
    <TurnOverNumber
      visibilitySensorOn={true}
      speed={200}
      springConfig={{
        stiffness: 100,
        damping: 10,
      }}
      style={{
        fontSize: '60px',
        fontWeight: 300,
        color: '#1f4d6a',
        marginTop: '50px',
      }}
    >
      8
    </TurnOverNumber>
  </React.Fragment>
);

export default App;
