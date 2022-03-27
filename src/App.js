import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ManageParkingLots from './components/ManageParkingLots';
import DashboardHome from './components/DashboardHome';

const theme = extendTheme({
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: ['sm', 'md'],
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="manage-parking-lots" element={<ManageParkingLots />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
