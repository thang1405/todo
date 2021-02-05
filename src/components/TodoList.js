import React, { useReducer, useEffect, useRef } from "react";
import { getList, checkValue } from "../util/list";
import { reducer,initState } from "../reducer/index";
import {
  ADD,
  ON_CHANGE,
  CHANGE_CHECK,
  DELETE_ITEM,
  CHANGE_ALL,
  CHANGE_FILLTER,
  CLEAR_COMPLETED,
} from "../action";

import TodoItem from "./TodoItem";

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initState);
  const todoInput = useRef(null);

  useEffect(() => {
    todoInput.current.focus();
  }, []);

  const tab = (type) => {
    const fillter = ["All", "Active", "Completed"];
    if (fillter.length > 0)
      return (
        <div className="inline-flex todo_sorts justify-center">
          {fillter.map((item, i) => (
            <button
              key={i}
              className={`list_sort py-1 px-2 mr-1 ${
                item === type ? "list_sort-selected" : "list_sort-normal"
              }`}
              onClick={() => {
                dispatch({ type: CHANGE_FILLTER, value: item });
              }}
            >
              {item}
            </button>
          ))}
        </div>
      );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: ADD });
    }
  };

  const listItems = (state) => {
    const lists = state.list;
    const type = state.type;
    if (lists.length > 0) {
      return getList(lists, type).map((x, i) => (
        <TodoItem
          key={x.index}
          item={x}
          index={i}
          onChange={() => dispatch({ type: CHANGE_CHECK, value: i })}
          onClick={() => dispatch({ type: DELETE_ITEM, value: i })}
        />
      ));
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="title p-6 block">
        <p>todos</p>
      </div>
      <div className="container border-current ">
        <div className="new_todo flex ">
          <input
            type="checkbox"
            id="check_all"
            onChange={() => dispatch({ type: CHANGE_ALL })}
            className="opacity-0 check_box-all"
            checked={checkValue(state.list)}
          />
          <label htmlFor="check_all" className="check_all py-4 px-6">
            <i className="fas fa-angle-down"></i>
          </label>
          <div className="py-4 flex-auto">
            <input
              className="new_todo-input w-full pl-12 pr-3"
              type="text"
              value={state.input}
              placeholder="What needs to be done?"
              onChange={(event) =>
                dispatch({ type: ON_CHANGE, value: event.target.value })
              }
              onKeyDown={handleKeyDown}
              ref={todoInput}
            />
          </div>
        </div>
        {listItems(state)}
        {state.list.length ? (
          <div className="footer px-4 py-3 flex  relative">
            <div className="float-left text-sm todo_count">
              {getList(state.list, 1).length} items left
            </div>
            {tab(state.type)}
            <div className="float-right text-sm todo_clear">
              {getList(state.list, 2).length ? (
                <button onClick={() => dispatch({ type: CLEAR_COMPLETED })}>
                  Clear completed
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
