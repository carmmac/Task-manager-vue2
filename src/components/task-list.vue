<template>
  <b-list-group class="row mt-3">
    <b-list-group-item
      :variant="active ? '' : 'dark'"
      v-for="{ text, id, active } in visibleTasks"
      :key="`task-${id}`"
    >
      <task-card :text="text" :active="active" :id="id" />
    </b-list-group-item>
  </b-list-group>
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
