import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth'
import Posts from './containers/Blog/Posts/Posts'
import NewPost from './containers/Blog/NewPost/NewPost';
import SignIn from './components/UI/Toolbar/FireBaseUI/SignIn'
import ShowPost from './containers/ShowPosts/ShowPost';
import MyPosts from './containers/MyPosts/MyPosts';
class App extends Component {
  render () {
    let routes =(<Switch>
      <Route path ='/auth' component={Auth}/>
      <Route path="/posts" component={Posts} />
      <Route path="/myposts" component={MyPosts} />
      <Route path="/new-post" component={NewPost} />
      <Route path="/fbauth" component={SignIn} />

      
      </Switch>)
        
    return (
     
      <BrowserRouter>
        <div className="App">

          <Layout/>
          {routes}

          <ShowPost/>  
        
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
