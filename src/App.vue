<template>
  <div class="page">
    <div class="page-wrapper">
      <form class="header" @submit.prevent="addTask">
        <input
          class="header-input"
          v-model.trim="newTaskText"
          ref="input"
          placeholder="Новая задача"
        />
        <button type="submit" class="header-submit">Добавить задачу</button>
      </form>

      <div class="filters">
        <button @click="setFilter(Filter.ACTIVE.value)" class="filter-item">
          {{ Filter.ACTIVE.label }}
        </button>
        <button @click="setFilter(Filter.ALL.value)" class="filter-item">
          {{ Filter.ALL.label }}
        </button>
        <button @click="setFilter(Filter.COMPLETED.value)" class="filter-item">
          {{ Filter.COMPLETED.label }}
        </button>
      </div>

      <ul v-if="isDataLoaded" class="task-list">
        <li v-for="{ text, id, active } in visibleTasks" :key="`task-${id}`">
          <task-card :text="text" :active="active" @setTaskCompleted="setCompleted(id)" />
        </li>
      </ul>
      <p v-else>Загрузка...</p>
    </div>
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
        ALL: {
          label: "Все",
          value: "all",
        },
        ACTIVE: {
          label: "Активные",
          value: "active",
        },
        COMPLETED: {
          label: "Завершенные",
          value: "completed",
        },
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
      const task = this.tasks[index];
      if (!task) {
        console.error(`Задача с индексом: ${index} не найдена!`);
        return;
      }
      this.$set(this.tasks, index, { ...task, active: !task.active });
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterTasks();
    },
    filterTasks() {
      this.visibleTasks = this.tasks.filter((task) => {
        switch (this.activeFilter) {
          case this.Filter.COMPLETED.value:
            return !task.active;
          case this.Filter.ACTIVE.value:
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
        throw new Error(`Ошибка fetch: ${e.message}`);
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

.filters {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.filter-item {
  width: 33%;
}

.task-list {
  margin: 10px 0 0 0;
  padding: 0;
  list-style: none;
}
</style>
