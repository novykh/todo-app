import React, { Fragment } from "react";
import { Router } from "@reach/router";
import Todos from "./providers/todos";
import TodoList from "./components/todoList";
import Footer from "./components/footer";

import "todomvc-app-css/index.css";

const App = () => (
  <Fragment>
    <Todos.Provider>
      <Router>
        <TodoList path="/" />
        <TodoList path=":status" />
      </Router>
    </Todos.Provider>
    <Footer />
  </Fragment>
);

export default App;
