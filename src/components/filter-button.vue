<template>
  <b-button
    :variant="buttonStyle"
    @click="changeFilter(filterValue)"
    class="col-3"
  >
    {{ filterLabel }}
  </b-button>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { MutationType } from "@/store/mutations";
import { State } from "@/store/state";
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
  computed: {
    ...mapState({
      activeFilter: State.CURRENT_FILTER,
    }),
    buttonStyle() {
      return this.activeFilter === this.filterValue ? 'primary' : 'light';
    }
  },
  methods: {
    ...mapMutations({ changeFilter: MutationType.SET_FILTER }),
  },
};
</script>
