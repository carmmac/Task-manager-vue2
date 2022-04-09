<template>
  <form class="header" @submit.prevent="submitHandler">
    <input
      class="header-input"
      v-model.trim="newTaskText"
      ref="input"
      placeholder="Новая задача"
    />
    <button type="submit" class="header-submit">Добавить задачу</button>
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

<style lang="scss" scoped>
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
