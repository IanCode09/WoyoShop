import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'


function App() {
  return (
    <Router>
      <Header />
      <main>
          <Route path='/' component={HomeScreen} exact />
          <Container>
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/product/:id' component={ProductScreen} /> 
            <Route path='/cart/:id?' component={CartScreen} />
          </Container>
      </main>

    </Router>
  );
}

export default App;
