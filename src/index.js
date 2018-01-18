import React from 'react';
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import  {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

import reducers  from './reducer';
import Auth from './Auth';
import Dashboard from './Dashboard';


const  reduxDevtools=window.devToolsExtension?window.devToolsExtension():()=>{};
const store=createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
));


ReactDOM.render(
     <Provider store={store}>
         <BrowserRouter>
             <div>
                 <Switch>
                     <Route path='/login' exact component={Auth}></Route>
                     <Route path='/dashboard'  component={Dashboard}></Route>
                     <Redirect  to='/dashboard'></Redirect>
                 </Switch>
             </div>
         </BrowserRouter>
      </Provider>,
    document.getElementById('root'));
