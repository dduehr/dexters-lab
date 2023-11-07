import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={createHashRouter(createRoutesFromElements(App()))} />
  </React.StrictMode>
)
