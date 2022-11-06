import React from 'react';
import styled from 'styled-components';

import Mapp from './Components/Mapp';
import Side from './Components/Side';
import { ChooseProvider } from './Context/ChooseProvider';


const Container = styled.div`
  display: flex;
`;

function App() {
  return (
    <div className="App">
      <ChooseProvider>
        <Container>
          <Mapp></Mapp>
          <Side></Side>
        </Container>
      </ChooseProvider>
    </div>
  );
}

export default App;
