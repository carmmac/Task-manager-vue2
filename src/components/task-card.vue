<template>
  <div>
    <label :for="`check-${id}`" class="me-2 pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        :class="`bi bi-check-square ${iconStyle}`"
        viewBox="0 0 16 16"
      >
        <path
          d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
        />
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"
        />
      </svg>
    </label>
    <input
      :id="`check-${id}`"
      type="checkbox"
      class="hidden"
      @change="setTaskCompleted(id)"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ActionType } from "@/store/actions";
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
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    iconStyle() {
      return this.active ? "active" : "";
    },
  },
  methods: {
    ...mapActions({
      setTaskCompleted: ActionType.SET_TASK_COMPLETED,
    }),
  },
};
</script>

<style lang="scss" scoped>
.hidden {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.pointer {
  cursor: pointer;
}

.active {
  background-color: #7de29f;
}
</style>
