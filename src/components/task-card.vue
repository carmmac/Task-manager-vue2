<template>
  <div class="task" :class="active ? '' : 'task--completed'">
    <label class="check-icon">
      <input
        type="checkbox"
        class="hidden"
        @change="setTaskCompleted"
      />
    </label>
    <span class="task-text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    text: {
      type: String,
      required: true,
      default: ``,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    setTaskCompleted() {
      this.$emit(`setTaskCompleted`);
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.check-icon {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-image: url("../assets/active.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #54e354;
  }
}

.task {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &--completed .task-text {
    background-color: #d1d1d1;
    text-decoration: line-through;
  }

  &--completed .check-icon::before {
    background-image: url("../assets/completed.png");
    background-color: #d1d1d1;
  }
}

.task-text {
  display: block;
  flex-basis: 100%;
  margin-left: 25px;
}
</style>
