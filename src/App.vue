<template>
  <div class="container p-3">
    <task-input-form />

    <filter-container />

    <task-list v-if="isDataLoaded" />
    <p v-else>Загрузка...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { State } from "./store/state";
import { ActionType } from "./store/actions";
import TaskInputForm from "./components/task-input-form.vue";
import TaskList from "./components/task-list.vue";
import FilterContainer from "./components/filter-container.vue";

export default {
  name: "App",
  components: { TaskInputForm, TaskList, FilterContainer },
  created() {
    this.loadTasks();
  },
  computed: {
    ...mapState({
      tasks: State.TASKS,
      activeFilter: State.CURRENT_FILTER,
      isDataLoaded: State.IS_DATA_LOADED,
    }),
  },
  methods: {
    ...mapActions({
      loadTasks: ActionType.FETCH_TASKS,
    }),
  },
};
</script>
