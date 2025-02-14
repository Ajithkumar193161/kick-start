import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children: [
      {
        path: 'begginer',
        loadChildren: () =>
          import('../modules/begginer/begginer.module').then((m) => m.BegginerModule),
      },
      {
        path: 'intermetiate',
        loadChildren: () =>
          import('../modules/intermetiate/intermetiate.module').then((m) => m.IntermetiateModule),
      },
      {
        path: '',
        redirectTo: 'begginer',
        pathMatch: 'full',
       
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
