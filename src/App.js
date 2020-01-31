import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Route from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Route />
      <GlobalStyle />
      <ToastContainer autoClose={2500} />
    </>
  );
}

export default App;
