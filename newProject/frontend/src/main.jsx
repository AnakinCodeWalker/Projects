import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import rootReducer from './reducer/index.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer : rootReducer,
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>
  </StrictMode>,
)
