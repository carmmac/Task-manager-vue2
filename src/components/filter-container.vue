<template>
  <div class="filter-container">
    <filter-button
      v-for="({ label, value }, i) in Object.values(filter)"
      :key="`filter-btn-${i}`"
      :filterLabel="label"
      :filterValue="value"
    />
  </div>
</template>

<script>
import { Filter } from "@/const";
import FilterButton from "./filter-button.vue";

export default {
  name: "FilterContainer",
  components: { FilterButton },
  data() {
    return {
      filter: Filter,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
