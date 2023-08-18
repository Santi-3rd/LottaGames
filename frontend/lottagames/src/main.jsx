import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import './index.css'
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
