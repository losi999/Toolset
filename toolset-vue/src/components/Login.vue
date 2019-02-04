<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>
        Username
        <input placeholder="Username" type="text" v-model="username">
        <!-- <ng-container *ngIf="username.touched && username.errors">
        <span class="error" *ngIf="username.errors.required">Required</span>
        </ng-container>-->
      </label>
    </div>
    <div>
      <label>
        Password
        <input placeholder="Password" type="password" v-model="password">
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
  public username: string = '';
  public password: string = '';

  //   @Prop() private msg!: string;
  public onSubmit() {
    console.log('submit', this.username, this.password);
  }
}
</script>

<style lang="scss" scoped>
</style>

