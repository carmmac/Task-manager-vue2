<template>
  <div class="task">
    <span class="task-text">{{ text }}</span>
    <button @click="setTaskCompleted">Сделано!</button>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    text: {
      type: String,
      required: true,
      default: ``,
    },
  },
  methods: {
    setTaskCompleted() {
      this.$emit(`setTaskCompleted`)
    },
  },
};
</script>
