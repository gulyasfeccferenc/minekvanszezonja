import React from "react";
import { Select, Tag } from "antd";
import classes from "./DynamicInput.module.scss";
import { months, monthsColor } from "../../../Constants";

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  if (label && value) {
    return (
      <Tag
        color={monthsColor[value]}
        style={{ marginRight: 3 }}
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
    );
  }
  return null;
}

/**
 * Deal with changes in the multiselect and sorting selected values by number.
 * @param event
 * @param field
 * @param wat
 */
function multiselectChangeHandler(event, field, wat) {
  event = event.sort((a, b) => a - b);
  wat.change(event, wat.elementConfig.name);
}

const dynamicInput = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case "text":
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          onChange={props.change}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          value={props.value}
          onChange={props.change}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((selectOption) => (
            <option value={selectOption.value} key={selectOption.value}>
              {selectOption.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "multiselect":
      inputElement = (
        <Select
          mode="multiple"
          className={classes.InputElement}
          options={months}
          allowClear="true"
          onChange={(event, field) =>
            multiselectChangeHandler(event, field, props)
          }
          placeholder="Choose when the given plant has its season"
          tagRender={tagRender}
          value={props.value}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label || props.name}</label>
      {inputElement}
    </div>
  );
};

export default dynamicInput;
