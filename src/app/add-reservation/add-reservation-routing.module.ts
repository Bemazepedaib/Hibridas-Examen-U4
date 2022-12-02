import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReservationPage } from './add-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: AddReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReservationPageRoutingModule {}
