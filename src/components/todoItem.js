import React, { useCallback, useRef, useState } from "react";
import Todos from "../providers/todos";
import useOnClickOutside from "use-onclickoutside";

import useDoubleClick from "../hooks/useDoubleClick";
import useOnEnter from "../hooks/useOnEnter";

const TodoItem = ({ id }) => {
  const [label, setLabel] = Todos.useMember({
    fieldKey: "label",
    resourceId: id,
  });
  const onChange = useCallback((event) => setLabel(event.target.value), [
    setLabel,
  ]);

  const [done, setDone] = Todos.useMember({ fieldKey: "done", resourceId: id });
  const onDone = useCallback((event) => setDone(event.target.checked), [
    setDone,
  ]);

  const remove = Todos.useAction("removeResource");
  const onDelete = useCallback(() => remove(id), [id, remove]);

  const [editing, setEditing] = useState(false);

  const startEditing = useCallback(() => setEditing(true), [setEditing]);
  const handleViewClick = useDoubleClick(startEditing);

  const finishedCallback = useCallback(() => {
    setEditing(false);
    const value = label.trim();
    value ? setLabel(value) : setTimeout(() => remove(id));
  }, [id, setLabel, label, remove]);

  const onEnter = useOnEnter(finishedCallback, []);
  const ref = useRef();
  useOnClickOutside(ref, finishedCallback);

  return (
    <li
      onClick={handleViewClick}
      className={`${editing ? "editing" : ""} ${done ? "completed" : ""}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={done}
          onChange={onDone}
          autoFocus
        />
        <label>{label}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
      {editing && (
        <input
          ref={ref}
          className="edit"
          value={label}
          onChange={onChange}
          onKeyPress={onEnter}
          autoFocus
        />
      )}
    </li>
  );
};

export default TodoItem;
