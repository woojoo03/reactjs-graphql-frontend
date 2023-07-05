//import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ----------------------------------------------------------------------

/** React.StrictMode 사용시 함수가 2번씩 호출 됨.. 개발 완료 후 제거 **/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>,
);
