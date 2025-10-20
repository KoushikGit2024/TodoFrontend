import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import {ThemeProvider} from "./contexts/ThemeContext"
import { DataProvider } from './contexts/DataContext.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <LoadingProvider>
          <App />   
        </LoadingProvider>
      </DataProvider>   
    </BrowserRouter>
  </StrictMode>,
)
