<template>
  <form>
    <div>
      <label>
        Username
        <input placeholder="Username" type="text">
        <!-- <ng-container *ngIf="username.touched && username.errors">
        <span class="error" *ngIf="username.errors.required">Required</span>
        <span class="error" *ngIf="username.errors.minlength">Username must be at least 4 characters long</span>
      </ng-container>
      <ng-container *ngIf="username.touched && !username.errors && username.warnings">
        <span class="warning" *ngIf="username.warnings.minlength">Username should be at least 6 characters long</span>
        </ng-container>-->
      </label>
    </div>
    <div>
      <label>
        Password
        <input placeholder="Password" type="password">
        <!-- <ng-container *ngIf="password.touched && password.errors">
        <span class="error" *ngIf="password.errors.required">Required</span>
        <span class="error" *ngIf="password.errors.minlength">Password must be at least 4 characters long</span>
      </ng-container>
      <ng-container *ngIf="password.touched && !password.errors && password.warnings">
        <span class="warning" *ngIf="password.warnings.minlength">Password should be at least 6 characters long</span>
        </ng-container>-->
      </label>
    </div>
    <div>
      <label>
        Password confirm
        <input placeholder="Password confirm" type="password">
        <!-- <ng-container *ngIf="passwordConfirm.touched && passwordConfirm.errors">
        <span class="error" *ngIf="passwordConfirm.errors.required">Required</span>
        <span class="error" *ngIf="passwordConfirm.errors.minlength">Password must be at least 4 characters long</span>
        <span class="error" *ngIf="passwordConfirm.errors.noMatch">Passwords do not match</span>
      </ng-container>
      <ng-container *ngIf="passwordConfirm.touched && !passwordConfirm.errors && passwordConfirm.warnings">
        <span class="warning" *ngIf="passwordConfirm.warnings.minlength">Password confirm should be at least 6
          characters long</span>
        </ng-container>-->
      </label>
    </div>
    <div>
      <label>
        Display name
        <input placeholder="Display name" type="text">
        <!-- <ng-container *ngIf="displayName.touched && displayName.errors">
        <span class="error" *ngIf="displayName.errors.required">Required</span>
        </ng-container>-->
      </label>
    </div>
    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Registration extends Vue {
  //   @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
</style>

