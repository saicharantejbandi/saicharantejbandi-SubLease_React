import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth'
import Posts from './containers/Blog/Posts/Posts'
import NewPost from './containers/Blog/NewPost/NewPost';
class App extends Component {
  render () {
    let routes =(<Switch>
      <Route path ='/auth' component={Auth}/>
      <Route path="/posts" component={Posts} />
      <Route path="/new-post" component={NewPost} />
      
      </Switch>)
    return (
     
      <BrowserRouter>
        <div className="App">

          <Layout/>
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
