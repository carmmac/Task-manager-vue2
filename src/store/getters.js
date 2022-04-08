import { Filter } from "@/const";

const GetterType = {
  GET_VISIBLE_TASKS: "getVisibleTasks",
};

const getters = {
  [GetterType.GET_VISIBLE_TASKS]: (state) => {
    const filteredTasks = state.tasks.filter((task) => {
      switch (state.currentFilter) {
        case Filter.COMPLETED.value:
          return !task.active;
        case Filter.ACTIVE.value:
          return task.active;
        default:
          return true;
      }
    });
    if (state.currentFilter === Filter.ALL.value) {
      filteredTasks.sort((task) => (task.active ? -1 : 1));
    }
    return filteredTasks;
  },
};

export { GetterType, getters };
