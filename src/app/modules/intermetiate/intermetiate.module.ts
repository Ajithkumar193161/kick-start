import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntermetiateRoutingModule } from './intermetiate-routing.module';
import { PushupComponent } from './pushup/pushup.component';

@NgModule({
  declarations: [
    PushupComponent
  ],
  imports: [
    CommonModule,
    IntermetiateRoutingModule
  ]
})
export class IntermetiateModule { }
