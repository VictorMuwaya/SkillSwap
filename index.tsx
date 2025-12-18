
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("SkillSwap application is mounting...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Root element with id 'root' not found.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("SkillSwap application rendered successfully.");
}
