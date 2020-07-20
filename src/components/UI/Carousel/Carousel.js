import React, {Component} from 'react';
import classes from './Carousel2.css'

import Card from './card';
let data={
    "Ram INSTALLATION":["https://computerhost.ca/wp-content/uploads/2019/08/services1.png",'UI/UX, Design' ],
    'CPU REPAIR':["https://computerhost.ca/wp-content/uploads/2019/08/services3.png",'UI/UX, Design' ],
    'MotherBoard REPAIR':["https://computerhost.ca/wp-content/uploads/2019/08/services2.png",'UI/UX, Design' ],
    'Custom Tools':["https://computerhost.ca/wp-content/uploads/2019/08/services1.png",'UI/UX, Design' ],
    'Custom ':["https://colorlib.com/preview/theme/seogo/img/case_study/2.png",'UI/UX, Design' ],
    'Hardware  Repair':["https://colorlib.com/preview/theme/seogo/img/case_study/2.png",'UI/UX, Design' ],
    
    

};
let dataNew={};
class Carousel extends Component {

    state={
        xtransform:'2.4%'
    };
    
    onClickBtn1= ()=> {
        this.setState({
            xtransform:'2.4%'
        })}

    onClickBtn2= ()=> {
        this.setState({
            xtransform:'-50.33333333333333%'
        })}

    onClickBtn3= ()=> {
        this.setState({
            xtransform:'-66.6666666667%'
        })}
    render()
    {   
        console.log(this.props.images);
        let formElementsArray = [];
        for (let header2 in data) {
            formElementsArray.push({

                header2: header2,
                arr: data[header2]
            });
        
        }
        if(this.props.images){
             formElementsArray = [];
            for (let header2 in {...this.props.images[0]}) {
                formElementsArray.push({
    
                    header2: Number(header2)+1,
                    arr: this.props.images[0][header2]
                });
            
            }
            

        /* for (let image in this.props.images[0]){
            console.log(this.props.images[0][image]);
           
        } */
    }

    if(dataNew){
        data={...dataNew}
    }
    console.log(dataNew);
        let flow = (
            formElementsArray.map(elements => (
                <Card 
                    header1={elements.header2}
                    imgSource={elements.arr}
                    /* header2={elements.arr[1]} */ />
            )));
        
        return(
            <div style={{margin: "100px 10px 10px" ,alignItems:'center', alignText:"center"}}>
                
            <div className={classes.center}>
            <div className={classes.wrapper}>
                <div className={classes.inner} style={{transform:"translateX("+this.state.xtransform+")"}}>

                {flow}
                </div>
            </div>
            </div>
            <div className={classes.map} style={{textAlign: "center", margin: "0 auto"}} >
                {formElementsArray.length>3?
                <div className={classes.map} style={{textAlign: "center", margin: "0 auto"}}>
                <button className={classes.button} onClick={this.onClickBtn1}></button>
                <button className={classes.button} onClick = {this.onClickBtn2}></button>
                <button className = {classes.button} onClick = {this.onClickBtn3}></button></div>:null
            }
            </div>

            </div>

        );
    }
}

export default Carousel;