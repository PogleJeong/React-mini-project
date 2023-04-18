import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './Styled Component/part_5';

const darkTheme = {
    textColor: "whitesmoke",
    backgrounderColor: "#111",
};

const whiteTheme = {
    textColor: "#111",
    backgrounderColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
);