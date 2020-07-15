import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Button from '../../../components/UI/Toolbar/Button/Button';
import Spinner from '../../../components/UI/Toolbar/Spinner/Spinner';
import classes from './NewPost.css';
import Input from '../../../components/UI/Toolbar/Input/Input';
import {updateObject , checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import {storage} from '../../../firebase/index';
import './NewPost.css';
import firebase from 'firebase';

class NewPost extends Component {
    
    state = {
        images:null,
        ierror:null,
        urls:null,
        loggedin:false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Enter Your Name"
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Enter Street"
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                label: "Zipcode"
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "City"
            },
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
                touched: false,
                label: "Email Address"
            },
            apt_name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Apartment Name'

                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Apartment Name"

            },

            price: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Enter Estimated Price in USD'

                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Estimated Price"

            },
            pets:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: true, displayValue: 'Allowed'},
                        {value: false, displayValue: 'Not Allowed'}
                       
                    ]
                },
                value: 'true',
                validation: {},
                valid: true,
                label: "Pets"
            
            },
            smoking:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: true, displayValue: 'Allowed'},
                        {value: false, displayValue: 'Not Allowed'}
                        
                    ]
                },
                value: 'true',
                validation: {},
                valid: true,
                label: "Smoking"
            },
            

            aptType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '1BHK', displayValue: '1BHK'},
                        {value: '2BHK', displayValue: '2BHK'},
                        {value: '3BHK', displayValue: '3BHK'},
                        {value: '4BHK', displayValue: '4BHK'}
                    ]
                },
                value: '1BHK',
                validation: {},
                valid: true,
                label: "Layout Type"
            },

            roomslease: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, displayValue: '1'},
                        {value: 2, displayValue: '2'},
                        {value: 3, displayValue: '3'},
                        {value: 4, displayValue: '4'}
                    ]
                },
                value: 1,
                validation: {},
                valid: true,
                label: "Number of rooms for lease"
            },

            moveinDate:{
                elementType:'input',
                elementConfig:{
                    type:'date',
                    placeholder:'Enter lease Start date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Move In Date"

            },
            moveoutDate:{
                elementType:'input',
                elementConfig:{
                    type:'date',
                    placeholder:'Enter lease End Date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Move Out Date"

            }
     
        },
        
        formIsValid: false
    }
    componentDidMount () {
        // If unauth => this.props.history.replace('/posts');
        this.props.updateUrl('/new-post')
        console.log( this.props );
        if (firebase.auth().currentUser){
            this.setState({loggedin:true})
            
    }
        else{
            this.setState({loggedin:false})
        }    
}


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], 
            {
                value: event.target.value,
                valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
                touched:true
            } ) 
            const updatedOrderForm = updateObject(this.state.orderForm, {
                [inputIdentifier]:updatedFormElement
            })
            
      
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    

    handleUpload = () =>{
        let urls=[];
        
     for(let image in this.state.images){
         
     const uploadTask = storage.ref(`images/${this.state.images[image].name}`)
     .put(this.state.images[image]);
     uploadTask.on(
         "state_changed",
         snapshot => {
             const progress = Math.round(
                 (snapshot.bytesTransferred/snapshot.totalBytes)*100
             );
             this.setState({progress:progress});
         },
         error =>{
             this.setState({ierror:error.message});
             console.log(error);
         },
         ()=>{
             storage
             .ref('images')
             .child(this.state.images[image].name)
             .getDownloadURL()
             .then(url =>{
                 //console.log(url);
                 urls.push(url);
             })
         }
     )}
    
     
     let d={...[urls]}
     
     this.setState({urls:d})
   };



    postHanndler = ( event ) => {
       
        event.preventDefault();
        //handleUpload();
        const postData = {urls:this.state.urls};
        for (let formElementIdentifier in this.state.orderForm) {
            postData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const post = {
            postData: postData,
            userId:this.props.uid}
        console.log(post)
        this.props.onPost(post,this.props.token);
        
    }
    handleChange = (e) =>{
        //console.log(e.target.files);
        let imgs=[];
        if(e.target.files){
            //console.log(e.target.files);
            for (let i=0; i< e.target.files.length;i++ ){
                console.log(e.target.files[i]) 
                imgs.push(e.target.files[i])   
            }

        console.log(imgs);
        this.setState({images:imgs});
        }
       };


       


      

    render () {
       
        let error=null;
        if(this.state.ierror || this.props.error){
            error=<p>{this.props.error +','+ this.state.ierror}</p>
        
        }
        let form =(<h>Please Login to Post</h>) ;
        

        if (this.props.emailVerified){
            
            const formElementsArray = [];
            for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
            }
            form = (
                <div>
                {!this.state.urls ? <p>Please upload room images</p>: <p>uploaded</p>}
                    <input type ='file' onChange = {this.handleChange} />
                    <button disabled={!this.state.images} onClick={this.handleUpload}  >Upload</button> 
                <form onSubmit={this.postHanndler}>
                    {error}
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            label={formElement.config.label} />
                            
                    ))}

                    
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>

                </form>
                </div>
            );
        }
        
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.NewPost} style={{width:'50%'}}>
                <h4>Enter your Contact Data</h4>
                
                {form}
                
            </div>
        );
    }
};


const mapStateToProps = state =>{
    return {
        loading:state.newPost.loading,
        token:state.auth.token,
        uid:state.auth.uid,
        user:state.auth.user,
        emailVerified:state.auth.emailVerified,
        
        
    }
}

const mapDispacthToProps = dispatch =>{

return{
    onPost:(post, token) => dispatch(actions.newPost(post, token)),
    updateUrl:(current) => dispatch(actions.updateUrl(current))
}}


export default connect(mapStateToProps, mapDispacthToProps) (NewPost);
