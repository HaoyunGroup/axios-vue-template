<template>
  <div class="search-bar">hhah</div>
</template>

<script>
import * as api from "../api";
const { example } = api;
export default {
  data() {
    return {};
  },
  beforeCreate() {
    example.getAllMatch().then(res => {
      console.log(res);
    });
  }
};
</script>
