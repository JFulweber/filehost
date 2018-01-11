import reACT from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'pages/home/Home.jsx'

class App extends reACT.Component {
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Home}/>
                //<Route component={404}/>
            </Switch>
        )
    }
}