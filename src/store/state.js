import { Filter } from "@/const";

const State = {
  TASKS: "tasks",
  VISIBLE_TASKS: "visibleTasks",
  CURRENT_FILTER: "currentFilter",
  IS_DATA_LOADED: "isDataLoaded",
};

const DEFAULT_FILTER = Filter.ALL.value;

const initialState = {
  [State.TASKS]: [],
  [State.CURRENT_FILTER]: DEFAULT_FILTER,
  [State.IS_DATA_LOADED]: false,
};

const state = initialState;

export { State, state };
