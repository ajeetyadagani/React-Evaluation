import React from 'react';
import {Routes,Route} from 'react-router-dom';
import{AuthProvider} from './contexts/AuthContext';
import Navbar from ',/components/Navbar';
import LoginPage from '.pages/loginPage';
import HomePage from '.pages/HomePage';
import ProductDetailsPage from '.pages/ProductDetailsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<PrivateRoute component={HpmePage}/>}/>
        <Route path="/product/:id" element={<PrivateRoute component={ProductDetailsPage}/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
