import React, { useCallback, useState } from "react";
import Todos from "../providers/todos";

import guid from "../helpers/guid";
import useOnEnter from "../hooks/useOnEnter";

const NewTodo = () => {
  const [label, setValue] = useState("");
  const onChange = useCallback((event) => setValue(event.target.value), [
    setValue,
  ]);

  const onAdd = Todos.useAction("initializeResource");

  const onKeyPress = useOnEnter(() => {
    if (!label) return;

    const id = guid();
    onAdd(id, { label, id });
    setValue("");
  }, [label]);

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyPress={onKeyPress}
      value={label}
      onChange={onChange}
    />
  );
};

export default NewTodo;
