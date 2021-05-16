import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SnakeBody } from './SnakeBody';
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
  }
`
const AppRoot = styled.div`
  height:100vh;
  display:flex;
  align-items: center;
  justify-content: center;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoot className="App">
        <SnakeBody />
      </AppRoot>
    </>
  );
}

export default App;
