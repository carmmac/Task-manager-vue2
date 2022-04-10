<template>
  <form class="d-flex align-items-top" @submit.prevent="submitHandler">
    <div class="flex-fill">
      <b-form-input
        id="input-live"
        v-model.trim="newTaskText"
        ref="newTaskInput"
        placeholder="Новая задача"
        :state="isValid"
        @input="setDirty"
        @blur="removeDirty"
        autofocus
      />
      <b-form-invalid-feedback id="input-live-feedback">
        Введите название задачи
      </b-form-invalid-feedback>
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
      isInputDirty: null,
    };
  },
  computed: {
    isValid() {
      return this.isInputDirty && Boolean(this.newTaskText.length);
    },
  },
  methods: {
    ...mapActions({
      addTask: ActionType.ADD_TASK,
    }),
    setDirty() {
      return this.isInputDirty = true;
    },
    removeDirty() {
      return this.isInputDirty = null;
    },
    submitHandler() {
      if (this.isValid) {
        this.addTask(this.newTaskText);
        this.newTaskText = "";
        this.removeDirty();
      } else {
        this.$refs.newTaskInput.focus();
        this.setDirty();
      }
    },
  },
};
</script>
