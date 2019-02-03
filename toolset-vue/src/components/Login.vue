<template>
  <form>
    <div>
      <label>
        Username
        <input placeholder="Username" type="text">
        <!-- <ng-container *ngIf="username.touched && username.errors">
        <span class="error" *ngIf="username.errors.required">Required</span>
        </ng-container>-->
      </label>
    </div>
    <div>
      <label>
        Password
        <input placeholder="Password" type="password">
        <!-- <ng-container *ngIf="password.touched && password.errors">
        <span class="error" *ngIf="password.errors.required">Required</span>
        </ng-container>-->
      </label>
    </div>
    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  //   @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
</style>

