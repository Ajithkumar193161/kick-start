import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntermetiateComponent } from './intermetiate.component';
import { PushupComponent } from './pushup/pushup.component';

const routes: Routes = [
  {
    path: '',
    component: IntermetiateComponent,
  },
    {
      path: 'pushup',
      component: PushupComponent,
    }
 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntermetiateRoutingModule { }
