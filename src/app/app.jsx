import reACT from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'

export default class App extends reACT.Component {
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        )
    }
}