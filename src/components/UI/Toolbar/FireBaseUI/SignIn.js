import React, {Component} from "react";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as actions from '../../../../store/actions/index';
import 'firebase/auth' 
import {connect} from 'react-redux';
class SignIn extends Component {
    state={
        isSignedIn:false
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }

      componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })
          console.log("user", user)
          
          if(user){
          localStorage.setItem('emailVerified',user.emailVerified);
          localStorage.setItem('uid',user.uid);
          localStorage.setItem('user',user);
          localStorage.setItem('userName',user.displayName);
          
          }
          
          

          this.props.authChange(user);

        })
      }

      signOut = ()=>{
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      }

    render(){
    let ver =null
    if (this.state.isSignedIn){
      if (!firebase.auth().currentUser.emailVerified){
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then( function(){
          console.log('email sent')}
          )
          .catch( error=>{
            console.log(error);
          })
      }
         ver=<p>Not verfied User</p>
      if(firebase.auth().currentUser.emailVerified){
      ver=<p>Verified User</p>
      }

    }
    
        return (
            <div>
              {ver}
                {this.state.isSignedIn ? 
                <div>
                <p>Signed In</p>

                    <button onClick={this.signOut} >SignOut</button>
                    <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                    </div>
                :
                <div>
                <p>Not signed In</p>
                <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
              </div>
                }
            </div>
        )
    }
}

 const mapDispatchToProps = dispatch =>{
  return {
    authChange: user =>dispatch(actions.fb_auth_change(user))
  }
}


export default connect(null, mapDispatchToProps)( SignIn);