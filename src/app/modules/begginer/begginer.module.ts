import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BegginerComponent } from './begginer.component';
import { BegginerRoutingModule } from './begginer-routing.module';
import { PushupComponent } from './pushup/pushup.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BegginerComponent,
    PushupComponent],
  imports: [
    CommonModule,
    BegginerRoutingModule,
    IonicModule, 
  ]
})
export class BegginerModule { }
