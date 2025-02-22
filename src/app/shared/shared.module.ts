import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDialogComponent } from './loading/loading-dialog/loading-dialog.component';

const sharedComponents = [LoadingDialogComponent]

@NgModule({
  declarations: [sharedComponents],
  imports: [
    CommonModule
  ],
  exports: [...sharedComponents],
})
export class SharedModule { }
