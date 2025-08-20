import React from 'react';
import TableCreator from './Components/TableCreator';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>React Table Creator</h1>
        <p>Interactive table creation interface inspired by Google Docs</p>
      </header>
      
      <main className="main-content">
        <TableCreator />
      </main>
      
      <footer className="app-footer">
        <p>Built with React • Hover to select • Click to create</p>
      </footer>
    </div>
  );
}

export default App;
