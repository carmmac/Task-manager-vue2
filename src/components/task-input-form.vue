<template>
  <form class="d-flex align-items-center" @submit.prevent="submitHandler">
    <div class="flex-fill">
      <b-form-input
        v-model.trim="newTaskText"
        ref="input"
        placeholder="Новая задача"
      />
    </div>
    <div class="ms-3">
      <b-button type="submit">Добавить задачу</b-button>
    </div>
  </form>
</template>

<script>
import { ActionType } from "@/store/actions";
import { mapActions } from "vuex";
export default {
  name: "TaskInputForm",
  data() {
    return {
      newTaskText: "",
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    ...mapActions({
      addTask: ActionType.ADD_TASK,
    }),
    submitHandler() {
      this.addTask(this.newTaskText);
      this.newTaskText = "";
    },
  },
};
</script>
