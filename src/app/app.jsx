import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Uploader from './components/Uploader/uploader.jsx'
import About from './pages/About/About.jsx';
import User from './pages/User/User.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Register from './pages/Register/Register.jsx';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const createClient = (initialState = {}) => new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
    cache: new InMemoryCache().restore(initialState)
});

let client = createClient();


export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/uploadTest' component={Uploader} />
                        <Route path='/user/:name/' component={User} />
                        <Route exact path='/logout' component={Logout} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}