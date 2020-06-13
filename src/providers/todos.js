import { makeCollectionHoax, hoaxResourceActions } from "react-hoax";

const actions = {
  clearCompleted: () => (getState, dispatch) => {
    const { ids, byId } = getState();

    ids.forEach((id) => {
      const todo = byId[id];
      if (todo.done) dispatch(hoaxResourceActions.removeResource(id));
    });
  },
  completeAll: () => (getState, dispatch) => {
    const { ids, byId } = getState();

    ids.forEach((id) => {
      const todo = byId[id];
      if (!todo.done)
        dispatch(hoaxResourceActions.updateResource(id, "done", true));
    });
  },
};

export default makeCollectionHoax("todos", {
  actions,
  resourceOptions: {
    getInitialState: () => ({ id: null, label: "", done: false }),
  },
});
