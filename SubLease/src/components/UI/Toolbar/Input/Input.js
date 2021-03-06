import React from 'react';

import classes from './Input.css';
import classes1 from './input1.css';

const input = ( props ) => {
    let inputlabel=null;
    inputlabel=<label className={classes.Label} >{props.label}</label>
    let inputElement = null;
    


    if (props.showpost==='present'){

        const inputClasses = [classes1.InputElement];
    if (props.important){
        inputlabel=<label className={classes1.Label} >{props.label}<em>&#x2a;</em></label>}
            
    
  
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes1.Invalid);
    }
        switch ( props.elementType ) {
            case ( 'input' ):
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
                break;
            case ( 'textarea' ):
                inputElement = <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
                break;
            case ( 'select' ):
                inputElement = (
                    <select
                    
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => {
                            if (option.value==='dont'){
                            return <option  value='dont' >
                                {option.displayValue}
                            </option>
                            }
                        else {
                            return <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>

                        }
                    }
                        )
                }
                        
                    </select>
                );
                break;
            default:
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
        }
        return (
            <div  className={classes1.new +classes1.contact}>
                
                {/* {inputlabel} */}
                {inputElement}
            
            </div>
        );
    
    
    }
    else{
    


        const inputClasses = [classes.InputElement];
        if (props.important){
            inputlabel=<label className={classes.Label} >{props.label}<em>&#x2a;</em></label>}
                
        
      
        if (props.invalid && props.shouldValidate && props.touched) {
            inputClasses.push(classes.Invalid);
        }




    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div  className={classes.contact}>
            
            {inputlabel}
            {inputElement}
        
        </div>
    );

}

    
};

export default input;