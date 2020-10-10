import React from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Hero from './components/Hero'
import HomeScreen from './screens/HomeScreen'


function App() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <Container>
          <HomeScreen />
        </Container>
      </main>
    </>
  );
}

export default App;
