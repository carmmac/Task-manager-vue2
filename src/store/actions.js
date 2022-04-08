import { MutationType } from "./mutations";

const ActionType = {
  FETCH_TASKS: "fetchTasks",
  FILTER_TASKS: "filterTasks",
  SET_TASK_COMPLETED: "setTaskCompleted",
  ADD_TASK: "addTask",
};

const actions = {
  [ActionType.FETCH_TASKS]: async ({ commit }) => {
    try {
      const res = await fetch(
        "https://my-json-server.typicode.com/falk20/demo/todos"
      );
      if (res.ok) {
        const data = await res.json();
        commit(MutationType.SET_DATA_LOAD_INDICATOR, true);
        commit(MutationType.SET_TASKS, data);
      } else {
        console.error(`Ошибка запроса, статус ответа ${res.status}`);
      }
    } catch (e) {
      throw new Error(`Ошибка fetch: ${e.message}`);
    }
  },
  [ActionType.SET_TASK_COMPLETED]: ({ commit }, taskId) => {
    commit(MutationType.SET_TASK_COMPLETED, taskId);
  },
  [ActionType.ADD_TASK]: ({ commit }, taskText) => {
    commit(MutationType.ADD_TASK, taskText);
  }
};

export { ActionType, actions };
