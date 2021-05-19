import  React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage'
import HomePage from '../components/HomePage/HomePage'
import Terms from '../components/Terms/Terms'
import Artists from '../components/Artists/Artists'


const Routes = () => (
    <BrowserRouter>
      <Switch>
    <Route path='/home' component={HomePage} />
        <Route exact path='/terms' component={Terms} />
        <Route exact path='/artists' component={Artists} />
        <Route exact path='/' component={LoginPage} />

        <Route exact path='*' component={() => <div>Page No Found</div>} />
        </Switch>
    </BrowserRouter>
  );

    export default Routes


