import React from "react";
import classes from './DynamicInput.module.scss'


const dynamicInput = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case "text":
            inputElement = <input className={classes.InputElement}
                                  value={props.value}
                                  {...props.elementConfig} />
            break;
        case "textarea":
            inputElement = <textarea className={classes.InputElement}
                                     value={props.value}
                                     {...props.elementConfig} />
            break;
        default:
            inputElement = <input kecskebeka="true"
                                  className={classes.InputElement}
                                  value={props.value}
                                  {...props.elementConfig} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label || props.name}</label>
            {inputElement}
        </div>
    )
}

export default dynamicInput;
