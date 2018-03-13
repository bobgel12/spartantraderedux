import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';



import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";


ReactDOM.render(
<BrowserRouter>
    <MuiThemeProvider>
        <Provider store={store}>
                <App />
        </Provider>
    </MuiThemeProvider>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
