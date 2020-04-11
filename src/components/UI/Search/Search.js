import React from "react";
import classes from './Search.module.scss';

const Search = (props) => (
    <div className={classes.SearchContainer}>
            <input type="search"
                   className={classes.Search}
                   value={props.value}
                   autoFocus
                   onChange={props.change}
                   placeholder="írd ide mit keresel"/>
    </div>
);

export default Search;
