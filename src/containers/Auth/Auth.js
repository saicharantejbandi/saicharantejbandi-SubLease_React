import React , {Component} from 'react';
import Input from '../../components/UI/Toolbar/Input/Input';
import Button from '../../components/UI/Toolbar/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Toolbar/Spinner/Spinner'
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility';
class Auth extends Component {
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }  
        },
        isSignUp:true
    };

    componentDidMount(){
            if (!this.props.buildingBurger && this.props.authRedirectpath!=='/')
            {
                this.props.onSetAuthRedirectPath();
            }
    }

    

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp )
    }

    switchAuthModeHandler = ()=>{
        this.setState(prevState =>{
            return {isSignUp :!prevState.isSignUp};
        })
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControl = updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName], {
                value:event.target.value,
                valid:checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true

            })
        } )
     
       this.setState({controls:updatedControl});
    }
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement =>(
            <Input 
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
           
        ));
        if(this.props.loading){
            form= <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
        errorMessage= <p>{this.props.error.message}</p>
        }
        let authRedirect=null;
        if(this.props.isAuthenticated ){
            authRedirect = <Redirect to ={this.props.authRedirect}/>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType ="Success">Submit</Button>
                </form>
        <Button 
        btnType ="Danger" 
        clicked={this.switchAuthModeHandler}
        >Switch to {this.state.isSignUp ? 'SIGN IN':'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token,
        //buildingBurger:state.burgerBuilder.building,
        authRedirect:state.auth.authRedirectpath
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onAuth:(email, password, isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Auth);