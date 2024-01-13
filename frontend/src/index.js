import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styled from 'styled-components'
import { AuthProvider } from './context/authProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

root.render(
  <React.StrictMode>
    <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
            <GlobalProvider>
              <Routes>
                <Route path='/*' element={<App />}/>
              </Routes> 
            </GlobalProvider>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);

