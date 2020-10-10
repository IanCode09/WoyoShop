import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Hero from './components/Hero'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'


function App() {
  return (
    <Router>
      <Header />
      <Hero />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} /> 
        </Container>
      </main>
    </Router>
  );
}

export default App;
