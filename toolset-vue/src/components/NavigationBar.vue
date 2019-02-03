<template>
  <nav>
    <ul>
      <li>
        <router-link to="/registration">REGISTRATION</router-link>
      </li>
      <li>
        <router-link to="/login">LOGIN</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavigationBar extends Vue {
//   @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
</style>
