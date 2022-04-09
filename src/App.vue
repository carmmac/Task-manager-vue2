<template>
  <div class="page">
    <div class="page-wrapper">
      <form class="header" @submit.prevent="submitHandler">
        <input
          class="header-input"
          v-model.trim="newTaskText"
          ref="input"
          placeholder="Новая задача"
        />
        <button type="submit" class="header-submit">Добавить задачу</button>
      </form>

      <filter-container />

      <task-list v-if="isDataLoaded" />
      <p v-else>Загрузка...</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { State } from "./store/state";
import { ActionType } from "./store/actions";
import TaskList from "./components/task-list.vue";
import FilterContainer from "./components/filter-container.vue";

export default {
  name: "App",
  components: { TaskList, FilterContainer },
  data() {
    return {
      newTaskText: "",
    };
  },
  created() {
    this.loadTasks();
  },
  mounted() {
    this.$refs.input.focus();
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
      addTask: ActionType.ADD_TASK,
    }),
    submitHandler() {
      this.addTask(this.newTaskText);
      this.newTaskText = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-wrapper {
  width: 500px;
  min-width: 310px;
  margin: 0 auto 0 25px;
  padding: 5px;
  border: 1px solid;
}

.header {
  display: flex;
  height: 35px;
  justify-content: space-between;
}

.header-input {
  flex-basis: 100%;
}

.header-submit {
  flex-shrink: 0;
  margin-left: 5px;
}
</style>
