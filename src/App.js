import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home></Home>
    </ChakraProvider>
  );
}

export default App;
