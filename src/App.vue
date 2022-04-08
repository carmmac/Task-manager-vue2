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

      <ul v-if="isDataLoaded" class="task-list">
        <li v-for="{ text, id, active } in visibleTasks" :key="`task-${id}`">
          <task-card
            :text="text"
            :active="active"
            @setTaskCompleted="setCompleted(id)"
          />
        </li>
      </ul>
      <p v-else>Загрузка...</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import TaskCard from "./components/task-card.vue";
import FilterContainer from "./components/filter-container.vue";
import { State } from "./store/state";
import { ActionType } from "./store/actions";
import { GetterType } from "./store/getters";

export default {
  name: "App",
  components: { TaskCard, FilterContainer },
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
    ...mapGetters({
      visibleTasks: GetterType.GET_VISIBLE_TASKS,
    }),
  },
  methods: {
    ...mapActions({
      loadTasks: ActionType.FETCH_TASKS,
      setCompleted: ActionType.SET_TASK_COMPLETED,
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

.task-list {
  margin: 10px 0 0 0;
  padding: 0;
  list-style: none;
}
</style>
