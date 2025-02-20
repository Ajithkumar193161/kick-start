import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'begginer',
        loadChildren: () =>
          import('../modules/begginer/begginer.module').then((m) => m.BegginerModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'intermetiate',
        loadChildren: () =>
          import('../modules/intermetiate/intermetiate.module').then((m) => m.IntermetiateModule),
        // canActivate: [AuthGuard]
      },
      // {
      //   path: 'Groceris/list',
      //   loadChildren: () =>
      //     import('../list/list.module').then(
      //       (m) => m.ListModule
      //     ),
      //   // canActivate: [AuthGuard]
      // },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
