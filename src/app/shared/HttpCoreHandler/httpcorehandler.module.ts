import { ErrorHandlerModule } from './errors/error-handler.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorHandlerModule
  ]
})
export class HttpCoreHandlerModule { }
