import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'


//GOOGLE API SECRETS
const { VITE_GOOGLE_CLIENT_ID } = import.meta.env


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
  ,
)
