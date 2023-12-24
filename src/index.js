import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { ConfigFieldsProvider } from './contexts/config-fields.context';

import './i18next/i18n';

import reportWebVitals from './reportWebVitals';

import './index.scss';
import Loader from './components/loader/loader.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='205106832327-2tmjsfmgk023j0r9i84p4n6tuaq5dths.apps.googleusercontent.com'>
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback=<div>Loading...</div>>
          <UserProvider>
            <ConfigFieldsProvider>
              <App />
            </ConfigFieldsProvider>
          </UserProvider>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
