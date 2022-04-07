<template>
  <div>
    <div v-if="!isDataLoaded">Загрузка...</div>
    <input v-model="newTaskText" ref="input" placeholder="Новая задача" />
    <button @click="addTask">Добавить задачу</button>

    <div>
      <button @click="setFilter('active')">Активные</button>
      <button @click="setFilter('all')">Все</button>
      <button @click="setFilter('completed')">Завершенные</button>
    </div>

    <ul>
      <li v-for="({ text, id }, i) in visibleTasks" :key="`task-${id}`">
        {{ text }}
        <button @click="setCompleted(i)">Сделано!</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tasks: [],
      visibleTasks: [],
      activeFilter: "all",
      newTaskText: "",
      isDataLoaded: false,
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
      this.tasks.push({ text: this.newTaskText });
      this.newTaskText = "";
    },
    setCompleted(i) {
      const task = this.tasks[i];
      this.$set(this.tasks, i, { ...task, active: true });
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterTasks();
    },
    filterTasks() {
      this.visibleTasks = this.tasks.filter((task) => {
        switch (this.activeFilter) {
          case "completed":
            return !task.active;
          case "active":
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
          console.error(`Ошибка, статус ответа ${res.status}`)
        }
      } catch (error) {
        console.error(error.message)
      }
    },
  },
  watch: {
    isDataLoaded() {
      this.filterTasks();
    }
  }
};
</script>

<style scoped>

</style>