<template>
  <div>
    <input v-model="newTaskText" ref="input" placeholder="Новая задача" />
    <button @click="addTask">Добавить задачу</button>

    <div class="filters">
      <button @click="setFilter(Filter.ACTIVE)" class="filter-item">Активные</button>
      <button @click="setFilter(Filter.ALL)" class="filter-item">Все</button>
      <button @click="setFilter(Filter.COMPLETED)" class="filter-item">Завершенные</button>
    </div>

    <ul v-if="isDataLoaded" class="task-list">
      <li v-for="{ text, id } in visibleTasks" :key="`task-${id}`">
        <task-card :text="text" @setTaskCompleted="setCompleted(id)" />
      </li>
    </ul>
    <p v-else>Загрузка...</p>
  </div>
</template>

<script>
import TaskCard from "./components/task-card.vue";

export default {
  name: "App",
  components: { TaskCard },
  data() {
    return {
      tasks: [],
      visibleTasks: [],
      activeFilter: "all",
      newTaskText: "",
      isDataLoaded: false,
      Filter: {
        ALL: "all",
        ACTIVE: "active",
        COMPLETED: "completed",
      },
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    addTask() {
      this.tasks.push({
        text: this.newTaskText,
        id: this.tasks.length + 1,
        active: true,
      });
      this.newTaskText = "";
    },
    setCompleted(id) {
      const index = this.tasks.findIndex((t) => t.id === id);
      const task = this.tasks[999];
      if (!task) {
        console.error(`Задача с индексом: ${index} не найдена!`);
        return;
      }
      this.$set(this.tasks, index, { ...task, active: false });
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterTasks();
    },
    filterTasks() {
      this.visibleTasks = this.tasks.filter((task) => {
        switch (this.activeFilter) {
          case this.Filter.COMPLETED:
            return !task.active;
          case this.Filter.ACTIVE:
            return task.active;
          default:
            return true;
        }
      });
    },
    async fetchData() {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/falk20/demo/todos"
        );
        if (res.ok) {
          const data = await res.json();
          this.tasks = data;
          this.isDataLoaded = true;
        } else {
          console.error(`Ошибка запроса, статус ответа ${res.status}`);
        }
      } catch (e) {
        throw new Error(`Ошибка fetch: ${e.message}`)
      }
    },
  },
  watch: {
    tasks() {
      this.filterTasks();
    },
  },
};
</script>
