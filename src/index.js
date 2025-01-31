import React from 'react';
import ReactDOM from 'react-dom/client'; // 修正ポイント
import './index.css';
import App from './App';

// ReactDOM.render の代わりに createRoot を使用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);