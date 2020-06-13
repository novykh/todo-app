import React, { useMemo } from "react";
import Todos from "../providers/todos";
import { Link } from "@reach/router";
import NewTodo from "./newTodo";
import TodoItem from "./todoItem";

const todosSelector = ({ ids, byId }) => {
  let doneIds = [];
  let leftIds = [];
  ids.forEach((id) =>
    byId[id].done ? (doneIds = [...doneIds, id]) : (leftIds = [...leftIds, id])
  );

  return {
    ids,
    doneIds,
    leftIds,
  };
};

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: "selected" } : {};

const TodoList = ({ status }) => {
  const { ids, doneIds, leftIds } = Todos.useSelector(todosSelector);
  const { clearCompleted, completeAll } = Todos.useAction();

  const leftSize = leftIds.length;
  const doneSize = doneIds.length;

  const visibleIds = useMemo(() => {
    switch (status) {
      case "active":
        return leftIds;
      case "completed":
        return doneIds;
      default:
        return ids;
    }
  }, [ids, doneIds, leftIds, status]);
  debugger;
  return (
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <NewTodo />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={doneSize === ids.length}
          onChange={completeAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {visibleIds.map((id) => (
            <TodoItem key={id} id={id} />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{leftSize}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <Link to="/" getProps={isActive}>
              All
            </Link>
          </li>
          <li>
            <Link to="/active" getProps={isActive}>
              Active
            </Link>
          </li>
          <li>
            <Link to="/completed" getProps={isActive}>
              Completed
            </Link>
          </li>
        </ul>
        {!!doneSize && (
          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </React.Fragment>
  );
};

export default TodoList;
