import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminViewPage } from './admin-view.page';

const routes: Routes = [
  {
    path: '',
    component: AdminViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminViewPageRoutingModule {}
