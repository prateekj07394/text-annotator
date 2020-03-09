import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers/index';

const store = createStore(
    reducers
)
ReactDOM.render(
    <Provider store={store}>
    <Router>
        <App />
    </Router>
    </Provider>,
    document.querySelector("#root")
);