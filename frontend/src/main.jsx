import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from './components/redux/store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Provider store={store}>
      
    <App />
    </Provider>
      
  </React.StrictMode>
);
