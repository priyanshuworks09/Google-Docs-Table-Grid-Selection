import React from 'react';
import './App.css';
import ExpeseForm from './Components/ExpenseForm';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer position='top-right' autoClose= {2000}></ToastContainer>
      <Provider store={store}>
        <ExpeseForm />
      </Provider>
      
      
    </div>
  );
}

export default App;
