import React, { useState, useEffect } from 'react';
import InputForm from './components/create-transaction';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <InputForm />
      </header>
    </div>
  );
}

export default App;
