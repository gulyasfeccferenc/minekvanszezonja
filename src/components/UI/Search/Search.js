import React, { useEffect, useRef } from "react";
import classes from "./Search.module.scss";

const Search = (props) => {
  const searchField = useRef(null);

  useEffect(() => {
    searchField.current.focus();
  }, []);

  return (
    <div className={classes.SearchContainer}>
      <input
        type="search"
        className={classes.Search}
        value={props.value}
        autoFocus
        ref={searchField}
        onChange={props.change}
        onEmptied={props.change}
        placeholder="Mit keresel?"
      />
    </div>
  );
};

export default Search;
