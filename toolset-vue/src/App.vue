<template>
  <div>
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationBar from './components/NavigationBar.vue';

@Component({
  components: {
    NavigationBar,
  },
})
export default class App extends Vue { }
</script>


<style lang="scss">
</style>
