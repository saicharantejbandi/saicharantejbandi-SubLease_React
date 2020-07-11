import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Toolbar/Button/Button';
import Spinner from '../../../components/UI/Toolbar/Spinner/Spinner';
import classes from './NewPost.css';
//import axios from '../../../axios-orders';
import Input from '../../../components/UI/Toolbar/Input/Input';
//import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {updateObject , checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import './NewPost.css';

class NewPost extends Component {
    
    state = {
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
                label: "Enter Your Name",
                important:true
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
                label: "Zipcode",
                important: true
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
                label: "Email Address",
                important: true
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
                label: "Apartment Name",
                important: true

            },

            price: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Enter Estimated Price'

                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                label: "Estimated Price",
                important: true

            },
            pets:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'y_pets', displayValue: 'Yes'},
                        {value: 'n_pets', displayValue: 'No'}
                       
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Pets"
            
            },
            smoking:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'y_smoke', displayValue: 'Yes'},
                        {value: 'n_smoke', displayValue: 'No'}
                        
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Smoking"
            },
            

            aptType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '1bhk', displayValue: '1BHK'},
                        {value: '2bhk', displayValue: '2BHK'},
                        {value: '3bhk', displayValue: '3BHK'},
                        {value: '4bhk', displayValue: '4BHK'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Layout Type"
            },

            roomslease: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '1_r', displayValue: '1'},
                        {value: '2_r', displayValue: '2'},
                        {value: '3_r', displayValue: '3'},
                        {value: '4_r', displayValue: '4'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                label: "Number of rooms for lease"
            },

            moveinDate:{
                elementType:'input',
                elementConfig:{
                    type:'date',
                    placeholder:'enter lease start date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Move In"

            },
            moveoutDate:{
                elementType:'input',
                elementConfig:{
                    type:'date',
                    placeholder:'enter lease end date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Move Out"

            }
     
        },
        
        formIsValid: false
    }
    componentDidMount () {
        // If unauth => this.props.history.replace('/posts');
        console.log( this.props );
    }



    // checkValidity(value, rules) {
    //     let isValid = true;
    //     if (!rules) {
    //         return true;
    //     }
        
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }

    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }

    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     return isValid;
    // }
    

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


   


    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }




        let form = (
            <form  onSubmit={this.orderHandler}>
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
                        important={formElement.config.important}/>
                        
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.NewPost} style={{width:'50%'}}>
                <h4 className={classes.contact}>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};



























//     postDataHandler = () => {
//         const data = {
//             title: this.state.title,
//             content: this.state.content,
//             author: this.state.author
//         };
//         axios.post( '/posts.json', data )
//             .then( response => {
//                 console.log( data );
//                 this.props.history.replace('/posts');
//                 // this.setState( { submitted: true } );
//             } );
//     }

//     render () {
//         let redirect = null;
//         if (this.state.submitted) {
//             redirect = <Redirect to="/posts" />;
//         }
//         return (
//             <div className="NewPost">
//                 {redirect}
//                 <h1>Add a Post</h1>
//                 <label>Title</label>
//                 <input type="text" value={this.state.title} onChange={( event ) => this.setState( { title: event.target.value } )} />
//                 <label>Details(Describe your unit and please provide your contact)</label>
//                 <textarea rows="4" value={this.state.content} onChange={( event ) => this.setState( { content: event.target.value } )} />
//                 <label>Author</label>
//                 <input type="text" value={this.state.author} onChange={( event ) => this.setState( { author: event.target.value } )} />
//                 <button onClick={this.postDataHandler}>Add Post</button>
//             </div>
//         );
//     }
// }

export default NewPost;




{/* <div class="contact-us">
  <form action="#">
    <label for="customerName">NAME <em>&#x2a;</em></label><input id="customerName" name="customerName" required="" type="text" /><label for="customerEmail">EMAIL <em>&#x2a;</em></label><input id="customerEmail" name="customerEmail" required="" type="email" /><label for="customerPhone">PHONE</label><input id="customerPhone" name="customerPhone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" type="tel" /><label for="orderNumber">ORDER NUMBER</label><input id="orderNumber" name="orderNumber" type="text" /><label for="customerNote">YOUR MESSAGE <em>&#x2a;</em></label><textarea id="customerNote" name="customerNote" required="" rows="4"></textarea>
    <h3>
      Please provide all the information about your issue you can.
    </h3>
    <label for="spamProtection">SPAM PROTECTION <em>&#x2a; </em><span>&nbsp;&nbsp;&nbsp;&nbsp;What day comes before July 11th?</span></label><input id="spamProtection" name="spamProtection" type="text" /><button id="customerOrder">SUBMIT</button>
  </form>
</div> */}








// state = {
//     title: '',
//     content: '',
//     author: '',
//     submitted: false
    
// }