import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BegginerComponent } from './begginer.component';
import { PushupComponent } from './pushup/pushup.component';

const routes: Routes = [
  {
    path: '',
    component: BegginerComponent,
  },
  {
    path: 'pushup',
    component: PushupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BegginerRoutingModule {}
