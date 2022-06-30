import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Homepage} from './components/Homepage';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Homepage />
    </RecoilRoot>
  </React.StrictMode>,
);
