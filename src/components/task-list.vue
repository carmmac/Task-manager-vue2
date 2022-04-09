<template>
  <ul class="task-list">
    <li v-for="{ text, id, active } in visibleTasks" :key="`task-${id}`">
      <task-card
        :text="text"
        :active="active"
        @setTaskCompleted="setCompleted(id)"
      />
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { GetterType } from "@/store/getters";
import { ActionType } from "@/store/actions";
import TaskCard from "./task-card.vue";

export default {
  name: "TaskList",
  components: { TaskCard },
  computed: {
    ...mapGetters({
      visibleTasks: GetterType.GET_VISIBLE_TASKS,
    }),
  },
  methods: {
    ...mapActions({
      setCompleted: ActionType.SET_TASK_COMPLETED,
    }),
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  margin: 10px 0 0 0;
  padding: 0;
  list-style: none;
}
</style>
