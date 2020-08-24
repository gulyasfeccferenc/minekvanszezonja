import React from "react";
import classes from './DynamicInput.module.scss'
import {Select, Tag} from "antd";

const months = [
    { label: 'Január',      value: 1, color: 'cyan' },
    { label: 'Február',         value: 2, color: 'cyan' },
    { label: 'Március',         value: 3, color: 'green' },
    { label: 'Április',         value: 4, color: 'green' },
    { label: 'Május',       value: 5, color: 'green' },
    { label: 'Június',      value: 6, color: 'red' },
    { label: 'Július',      value: 7, color: 'red' },
    { label: 'Augusztus',       value: 8, color: 'red' },
    { label: 'Szeptember',      value: 9, color: 'gold' },
    { label: 'Október',         value: 10, color: 'gold' },
    { label: 'November',        value: 11, color: 'gold' },
    { label: 'December',        value: 12, color: 'cyan' },
];
const monthsColor = {
    1: 'cyan',
    2: 'cyan',
    3: 'green',
    4: 'green',
    5: 'green',
    6: 'red',
    7: 'red',
    8: 'red',
    9: 'gold',
    10: 'gold',
    11: 'gold',
    12: 'cyan',
}

function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
        <Tag color={monthsColor[value]} style={{ marginRight: 3 }} closable={closable} onClose={onClose}>
            {label}
        </Tag>
    );
}

function multiselectChangeHandler(event, field, wat) {
    wat.change(event, wat.elementConfig.name)
}

const dynamicInput = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case "text":
            inputElement = <input className={classes.InputElement}
                                  value={props.value}
                                  onChange={props.change}
                                  {...props.elementConfig} />
            break;
        case "textarea":
            inputElement = <textarea className={classes.InputElement}
                                     value={props.value}
                                     onChange={props.change}
                                     {...props.elementConfig} />
            break;
        case "select":
            inputElement = (<select className={classes.InputElement}
                                     value={props.value}
                                     onChange={props.change}
            >
                {props.elementConfig.options.map((selectOption) => {
                    return (<option value={selectOption.value} key={selectOption.value}>{selectOption.displayValue}</option>)
                })}
            </select>)
            break;
        case "multiselect":
            inputElement = (<Select mode="multiple"
                                    className={classes.InputElement}
                                    options={months}
                                    allowClear="true"
                                    onChange={(event, field) => multiselectChangeHandler(event, field, props)}
                                    // onSelect={props.change}
                                    tagRender={tagRender}
                                    value={props.value}
            />)
            break;
        default:
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
