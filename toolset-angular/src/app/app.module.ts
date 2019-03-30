import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@/app/app-routing.module';
import { AppComponent } from '@/app/app.component';
import { AuthModule } from '@/app/auth/auth.module';
import { NavigationBarComponent } from '@/app/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
