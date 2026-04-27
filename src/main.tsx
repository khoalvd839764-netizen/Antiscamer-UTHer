import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/fonts.css';
import './styles/tailwind.css'; // 👈 THÊM DÒNG NÀY

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);