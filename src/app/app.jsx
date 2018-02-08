import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Uploader from './components/Uploader/uploader.jsx'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
    cache: new InMemoryCache()
});


export default class App extends React.Component {
    render(){
        return(
            <ApolloProvider client = {client}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/uploadTest" component={Uploader}/>
                </Switch>
            </BrowserRouter>
            </ApolloProvider>
        )
    }
}