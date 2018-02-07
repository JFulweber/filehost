import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Uploader from './components/Uploader/uploader.jsx'

export default class App extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/uploadTest" component={Uploader}/>
                </Switch>
            </BrowserRouter>
        )
    }
}