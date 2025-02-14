import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [LoginComponent,AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule, IonicModule,
  ],
  bootstrap: [AppComponent],
})
export class AuthModule { }
