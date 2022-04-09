<template>
  <div class="d-flex align-items-center mt-3 justify-content-between">
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
