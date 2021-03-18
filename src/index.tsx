import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <ToastProvider autoDismiss autoDismissTimeout={2000} placement="bottom-center">
            <AppRouter />
        </ToastProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
