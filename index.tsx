
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("SkillSwap application is mounting...");

// Add global error logging to help debug blank screen issues
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global Error Caught:", { message, source, lineno, colno, error });
  return false;
};

window.onunhandledrejection = function(event) {
  console.error("Unhandled Promise Rejection:", event.reason);
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Root element with id 'root' not found.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("SkillSwap application rendered successfully.");
  } catch (err) {
    console.error("Rendering Error:", err);
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; color: #b91c1c; font-family: sans-serif; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; margin: 20px;">
          <h2 style="margin-top: 0;">Initialization Error</h2>
          <p>The application failed to start. Please check the console for details.</p>
          <pre style="background: #fff; padding: 15px; border: 1px solid #fecaca; border-radius: 8px; overflow: auto;">${err instanceof Error ? err.stack || err.message : String(err)}</pre>
        </div>
      `;
    }
  }
}
