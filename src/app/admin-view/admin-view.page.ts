import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.page.html',
  styleUrls: ['./admin-view.page.scss'],
})
export class AdminViewPage implements OnInit {

  public reservations: Reservation[]
  public next2: Boolean = false

  constructor(private rS: ReservationService) {
    this.rS.getReservations().subscribe(res => {
      this.reservations = res
    })
  }

  ngOnInit() {

  }

  public toggleValue(){
    this.next2 = !this.next2
    console.log(this.next2)
  }

}
