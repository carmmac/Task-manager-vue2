const MutationType = {
  SET_TASKS: "SET_TASKS",
  SET_FILTER: "SET_FILTER",
  SET_DATA_LOAD_INDICATOR: "SET_DATA_LOAD_INDICATOR",
  SET_TASK_COMPLETED: "SET_TASK_COMPLETED",
  ADD_TASK: "ADD_TASK",
};

const mutations = {
  [MutationType.SET_TASKS]: (state, payload) => {
    state.tasks = payload;
  },
  [MutationType.SET_FILTER]: (state, payload) => {
    state.currentFilter = payload;
  },
  [MutationType.SET_DATA_LOAD_INDICATOR]: (state, payload) => {
    state.isDataLoaded = payload;
  },
  [MutationType.SET_TASK_COMPLETED]: (state, taskId) => {
    const tasks = state.tasks.concat();
    const index = state.tasks.findIndex((t) => t.id === taskId);
    const task = state.tasks[index];
    if (!task) {
      console.error(`Задача с индексом: ${index} не найдена!`);
      return;
    }
    tasks[index] = { ...task, active: !task.active };
    state.tasks = tasks;
  },
  [MutationType.ADD_TASK]: (state, taskText) => {
    const newTask = {
      text: taskText,
      active: true,
      id: state.tasks.length + 1,
    };
    state.tasks.push(newTask);
  },
};

export { MutationType, mutations };
