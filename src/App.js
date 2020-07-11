import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth'
import Posts from './containers/Blog/Posts/Posts'
import NewPost from './containers/Blog/NewPost/NewPost';
import SignIn from './components/UI/Toolbar/FireBaseUI/SignIn'
class App extends Component {
  render () {
    let routes =(<Switch>
      <Route path ='/auth' component={Auth}/>
      <Route path="/posts" component={Posts} />
      <Route path="/new-post" component={NewPost} />
      <Route path="/fbauth" component={SignIn} />
      
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
