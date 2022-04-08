<template>
  <button @click="changeFilter(filterValue)" class="filter-button">
    {{ filterLabel }}
  </button>
</template>

<script>
import { mapMutations } from "vuex";
import { MutationType } from "@/store/mutations";
export default {
  name: "FilterButton",
  props: {
    filterLabel: {
      type: String,
      required: true,
    },
    filterValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapMutations({ changeFilter: MutationType.SET_FILTER }),
  },
};
</script>

<style lang="scss" scoped>
.filter-button {
  width: 30%;
}
</style>
