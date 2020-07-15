import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Toolbar/Button/Button';
import Spinner from '../../components/UI/Toolbar/Spinner/Spinner';
import classes from './ShowPost.css';
//import axios from '../../../axios-orders';
import Input from '../../components/UI/Toolbar/Input/Input';
//import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {updateObject , checkValidity} from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import './ShowPost.css';
//import { copy } from 'fs-extra';

class NewPost extends Component {
    

    

    state = {
        show_image:[],
        show_orderForm: {
            
            show_street: {
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
            show_zipCode: {
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
                label: "Zipcode",
                important: true
            },
            
            
       

            show_price: {
                elementType: 'select',
                name: 'Price',
                elementConfig: {
                    options: [
                        {value: 'dont' , displayValue: 'Price'},
                        {value: '500', displayValue: '500$'},
                        {value: '1000', displayValue: '1000$'},
                        {value: '1500', displayValue: '1500$'},
                        {value: '2000', displayValue: '2000$'}
                    ]
                },
               
                validation: {},
                valid: true,
                label: "Expecting Price Range"
            },

            
            show_pets:{
                elementType: 'select',
                name: 'Pets',
                elementConfig: {
                    options: [
                        {value: 'dont', displayValue: 'Pets'},
                        {value: 'true', displayValue: 'Yes'},
                        {value: 'false', displayValue: 'No'}
                       
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Pets"
            
            },
            show_smoking:{
                elementType: 'select',
                name:'Smoking',
                elementConfig: {
                    options: [
                        {value: 'dont', displayValue: 'Smoking'},
                        {value: 'true', displayValue: 'Yes'},
                        {value: 'false', displayValue: 'No'}
                        
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Smoking"
            },
            

            show_aptType: {
                elementType: 'select',
                name:'Apartment Type',
                elementConfig: {
                    options: [
                        {value: 'dont', displayValue: "Apartment Type"},
                        {value: '1BHK', displayValue: '1BHK'},
                        {value: '2BHK', displayValue: '2BHK'},
                        {value: '3BHK', displayValue: '3BHK'},
                        {value: '4BHK', displayValue: '4BHK'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Layout Type"
            }
        },

            
            show_formIsValid: false,
            
            
        };
    
        
        
    



    componentDidMount () {
        // If unauth => this.props.history.replace('/posts');
      
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.show_orderForm[inputIdentifier], 
            {
                value: event.target.value,
                valid:checkValidity(event.target.value, this.state.show_orderForm[inputIdentifier].validation),
                touched:true
            } ) 
            const updatedOrderForm = updateObject(this.state.show_orderForm, {
                [inputIdentifier]:updatedFormElement
            })
            
      
        
        let show_ = true;
        for (let inputIdentifier in updatedOrderForm) {
            show_ = updatedOrderForm[inputIdentifier].valid && show_;
        }
        this.setState({show_orderForm: updatedOrderForm, show_: show_});
    }
    
    postHanndler = ( event ) => {
        event.preventDefault();
        // const postData = {};
        // for (let formElementIdentifier in this.state.show_orderForm) {
        //     postData[formElementIdentifier] = this.state.show_orderForm[formElementIdentifier].value;
        // }
       
        // console.log(postData)
        // this.props.onPost(post,this.props.token);
        let show_zip=null;
        let show_pet=null;
        let show_apt=null;
        let show_price=null;
        let show_smoke=null;

        for (let formElementIdentifier in this.state.show_orderForm){
            if (formElementIdentifier==='show_zipCode'){
                show_zip=this.state.show_orderForm[formElementIdentifier].value;
            }
            if (formElementIdentifier==='show_price'){
                show_price=this.state.show_orderForm[formElementIdentifier].value;
            }
            if (formElementIdentifier==='show_aptType'){
                show_apt=this.state.show_orderForm[formElementIdentifier].value;

            }
            if (formElementIdentifier==='show_pets'){
                show_pet=this.state.show_orderForm[formElementIdentifier].value;
            }
            if (formElementIdentifier==='show_smoking'){
                show_smoke=this.state.show_orderForm[formElementIdentifier].value;
            }
           
                
            
        }
        
        axios.get('https://react-my-burger-4ff3d.firebaseio.com/posts.json?&orderBy="userId"&equalTo="rroQ6e5l1GbSi5JP6hkiX9uCN4D2"')
        .then(res =>{
            
        })
        .catch(err =>{
            console.log(err);
        })

        axios.get( 'https://react-my-burger-4ff3d.firebaseio.com/posts.json?print=pretty')
            .then( res => {
                const fetchedposts=[];
           
                for (let i in res.data){
                    console.log(res.data[i]['postData']['zipCode']);
                        if (res.data[i]['postData']['zipCode']===show_zip && res.data[i]['postData']['smoking']===show_smoke 
                        && res.data[i]['postData']['pets']===show_pet && Number(res.data[i]['postData']['price'])<=show_price  
                        && res.data[i]['postData']['aptType']===show_apt) {
                            console.log(res.data[i]['postData'])

                            fetchedposts.push({
                                ...res.data[i]['postData'],
                                id:i})}
                    }
                    console.log(fetchedposts)
                    const updatedPosts = fetchedposts.map( post => {
                        return {
                            ...post,}
                    } );
                console.log(updatedPosts);
                })
                    

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
        this.setState({show_image:imgs});
        console.log(this.state);
        }
       
      }
      printValue(){

      }

      
      render () {
        const formElementsArray = [];
        for (let key in this.state.show_orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.show_orderForm[key]
            });
        }







        let form = (
            <form  onSubmit={this.postHanndler} style={{display:'flex'}} >
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
                        label={formElement.config.label} 
                        important={formElement.config.important}
                        showpost='present'
                        selectName={formElement.config.name}
                        />
                        
                        
                ))}
                {/* <Button btnType="Success" disabled={!this.state.show_}>Show results</Button> */}
                <button >  Show Results</button>

            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.new}>
            <div  className={classes.NewPost} >
                <h4 className={classes.contact}>Enter your Contact Data</h4>
                {form}
            </div>
            </div>
        );
    }

    
};


const mapStateToProps = state =>{
    return {
        loading:state.newPost.loading,
        token:state.auth.token,
        userId:state.auth.userId,
        
    }
}

const mapDispacthToProps = dispatch =>{

return{
    onPost:(post, token) => dispatch(actions.newPost(post, token))
}}


export default connect(mapStateToProps, mapDispacthToProps) (NewPost);









// render () {
//     let form =(<h>Please Login to Post</h>) ;
//     if (this.props.userId){
//         const formElementsArray = [];
//     for (let key in this.state.show_orderForm) {
//         formElementsArray.push({
//             id: key,
//             config: this.state.show_orderForm[key]
//         });
//     }
//  form = (
//         <form onSubmit={this.postHanndler}>
//             {formElementsArray.map(formElement => (
//                 <Input 
//                     key={formElement.id}
//                     elementType={formElement.config.elementType}
//                     elementConfig={formElement.config.elementConfig}
//                     value={formElement.config.value}
//                     invalid={!formElement.config.valid}
//                     shouldValidate={formElement.config.validation}
//                     touched={formElement.config.touched}
//                     changed={(event) => this.inputChangedHandler(event, formElement.id)}
//                     label={formElement.config.label} />
                    
//             ))}

//             <Button btnType="Success" disabled={!this.state.show_}>ORDER</Button>
//         </form>
//     );
//     }
    
//     if ( this.props.loading ) {
//         form = <Spinner />;
//     }
//     return (
//         <div className={classes.NewPost} style={{width:'50%'}}>
//             <h4>Enter your Contact Data</h4>
//             {form}
//             <input type ='file' onChange = {this.handleChange} multiple/>
//         </div>
//     );
// }








// state = {
//     show_image:[],
//     show_orderForm: {
//         Show_name: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'Your Name'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "Enter Your Name"
//         },
//         show_street: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'Street'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "Enter Street"
//         },
//         show_zipCode: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'ZIP Code'
//             },
//             value: '',
//             validation: {
//                 required: true,
//                 minLength: 5,
//                 maxLength: 5,
//                 isNumeric: true
//             },
//             valid: false,
//             touched: false,
//             label: "Zipcode"
//         },
//         country: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'City'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "City"
//         },
//         email: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'email',
//                 placeholder: 'Your E-Mail'
//             },
//             value: '',
//             validation: {
//                 required: true,
//                 isEmail: true
//             },
//             valid: false,
//             touched: false,
//             label: "Email Address"
//         },
//         apt_name: {
//             elementType: 'input',
//             elementConfig:{
//                 type: 'text',
//                 placeholder: 'Apartment Name'

//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "Apartment Name"

//         },

//         show_price: {
//             elementType: 'input',
//             elementConfig:{
//                 type: 'text',
//                 placeholder: 'Enter Estimated Price in USD'

//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "Estimated Price"

//         },
//         show_pets:{
//             elementType: 'select',
//             elementConfig: {
//                 options: [
//                     {value: true, displayValue: 'Allowed'},
//                     {value: false, displayValue: 'Not Allowed'}
                   
//                 ]
//             },
//             value: 'true',
//             validation: {},
//             valid: true,
//             label: "Pets"
        
//         },
//         show_smoking:{
//             elementType: 'select',
//             elementConfig: {
//                 options: [
//                     {value: true, displayValue: 'Allowed'},
//                     {value: false, displayValue: 'Not Allowed'}
                    
//                 ]
//             },
//             value: 'true',
//             validation: {},
//             valid: true,
//             label: "Smoking"
//         },
        

//         show_aptType: {
//             elementType: 'select',
//             elementConfig: {
//                 options: [
//                     {value: '1BHK', displayValue: '1BHK'},
//                     {value: '2BHK', displayValue: '2BHK'},
//                     {value: '3BHK', displayValue: '3BHK'},
//                     {value: '4BHK', displayValue: '4BHK'}
//                 ]
//             },
//             value: '1BHK',
//             validation: {},
//             valid: true,
//             label: "Layout Type"
//         },

//         roomslease: {
//             elementType: 'select',
//             elementConfig: {
//                 options: [
//                     {value: 1, displayValue: '1'},
//                     {value: 2, displayValue: '2'},
//                     {value: 3, displayValue: '3'},
//                     {value: 4, displayValue: '4'}
//                 ]
//             },
//             value: 1,
//             validation: {},
//             valid: true,
//             label: "Number of rooms for lease"
//         },

//         moveinDate:{
//             elementType:'input',
//             elementConfig:{
//                 type:'date',
//                 placeholder:'Enter lease Start date'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "Move In Date"

//         },
//         moveoutDate:{
//             elementType:'input',
//             elementConfig:{
//                 type:'date',
//                 placeholder:'Enter lease End Date'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             label: "Move Out Date"

//         }
 
//     },
    
//     show_: false
// }
