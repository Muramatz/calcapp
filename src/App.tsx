import React from 'react';
import styled from "styled-components";
import { Calculator } from "./organisms/Calc";

function App() {
  return (
    <Wrap>
      <Calculator/>
    </Wrap>
  );
}

const Wrap = styled.div`
  background-color: #282c34;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App;
