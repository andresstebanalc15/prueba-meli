import React, { useState, useCallback } from "react";
import LogoImg from "../../assets/static/ic_search.png";
import { Button } from "./Input.styles";
import { navigate } from "@reach/router";

export const Input = ({ text = "" }) => {
  const redirectToSearch = () => {
    const search = document.getElementById("search").value;
    document.getElementById("suggestion").className = "dropdown-menu";

    navigate("/items?search=" + search);
  };

  const [suggestions, setSuggestions] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 200);
    };
  };

  const handleChange = (value) => {
    const api = process.env.API;
    const itemInfo = `${api}/api/items?q=${value}`;
    fetch(itemInfo)
      .then((res) => res.json())
      .then((json) => {
        setSuggestions(json.items);
      });

    value.length === 0
      ? (document.getElementById("suggestion").className = "dropdown-menu")
      : (document.getElementById("suggestion").className =
          "dropdown-menu show");
  };

  const handleOnClick = (value) => {
    document.getElementById("suggestion").className = "dropdown-menu";
    document.getElementById("search").value = value;
    navigate("/items?search=" + value);
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  return (
    <div>
      <div className="input-group">
        <input
          className="form-control"
          placeholder={text}
          id="search"
          onChange={(e) => optimizedFn(e.target.value)}
        />

        <Button
          className="btn btn-light p-0"
          type="button"
          onClick={redirectToSearch}>
          <img src={LogoImg} className="col-7"></img>
        </Button>
      </div>
      <div className="dropdown ">
        <ul
          id="suggestion"
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1">
          {suggestions.length > 0 && (
            <div className="autocomplete">
              {suggestions
                .filter((item, index) => index < 10)
                .map((el, i) => (
                  <li key={i}>
                    <span
                      className="dropdown-item"
                      onClick={(e) => handleOnClick(e.target.textContent)}>
                      {el.title}
                    </span>
                  </li>
                ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
