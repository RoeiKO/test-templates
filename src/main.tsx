import React from 'react';
import { createRoot } from 'react-dom/client';

import '@total-typescript/ts-reset';

import './index.css';
import { enableMocking } from '@/testing/mocks';

import App from './app';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

enableMocking().then(() => {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
