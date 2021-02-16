import React from 'react'
import style from  './App.module.css';
import 'antd/dist/antd.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginConteiner from './Component/Login/LoginConteiner';
import PageConteiner from './Component/Page/PageConteiner';

const App = () => {
  return (
    <div className={style.app}>
      <Switch>
        <Route exact path = "/" render = {()=><Redirect to = {"/page"} />} />
        <Route path = "/page" render = {()=> <PageConteiner />} />
        <Route path = "/login" render = {()=> <LoginConteiner />} />
      </Switch>       
    </div>
  );
}

export default App;
