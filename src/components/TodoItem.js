import React, { useState, useRef, useEffect } from "react";

const TodoItem = ({ item, index, onChange, onClick })=> {
  const [text, setText] = useState(item.value);
  const [focus, setFocus] = useState(false);
  const currentRef = useRef(null);
  console.log(item, index);

  useEffect(() => {
    if (focus) {
      currentRef.current.focus();
    }
  }, [focus]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFocus(false);
    }
  };

  const handleDoubleClick = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <div className="todo_item flex" ref={currentRef} key={index}>
      <input
        className="todo_item-checkbox opacity-0 absolute"
        type="checkbox"
        id={index}
        onChange={onChange}
        checked={item.checked}
      />
      <div className=" flex justify-center items-center px-4">
        <label
          htmlFor={index}
          className={`checkbox_custom flex justify-center items-center w-8 h-8 ${
            item.checked ? "todo_item-checkbox__checked" : ""
          }`}
        >
          <i className="fas fa-check"></i>
        </label>
      </div>
      {focus ? (
        <input
          type="text"
          className="todo_item-name p-4 _focus w-full"
          value={text}
          ref={currentRef}
          onChange={handleChange}
          onKeyDown={_handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          className={`todo_item-name w-full p-4 ${
            item.checked ? "todo_item-name-active" : ""
          }`}
        >
          {text}
        </div>
      )}
      {!focus ? (
        <button className="todo_item-close" onClick={onClick}>
          <i className="fas fa-times"></i>
        </button>
      ) : null}
    </div>
  );
}

export default TodoItem;
