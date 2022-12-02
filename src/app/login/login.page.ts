import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public validationMessages: Object
  public reservations: Reservation[]
  public cliente: Client

  constructor(private fB: FormBuilder, private r: Router, private rS: ReservationService) { 
    this.rS.getReservations().subscribe(res => {
      this.reservations = res
    })
  }

  ngOnInit() {
    this.myForm = this.fB.group({
      phone: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)])],
    })
    this.validationMessages = {
      'phone': [
        { type: 'required', message: "Teléfono obligatorio" },
        { type: 'pattern', message: "Número telefónico inválido"},
        { type: 'minLength', message: "El número telefónico debe de ser de 10 dígitos" },
        { type: 'maxLength', message: "El número telefónico debe de ser de 10 dígitos" }
      ]
    }
  }

  async login() {
    if (this.myForm.get('phone').value == "Admin") {
      this.r.navigate(
        ['/admin-view']
      )
      this.myForm.reset()
      return
    } else {
      if (this.reservacionValida){
        this.r.navigate(
          ['/add-reservation'],{
            queryParams: {}
          }
        )
      }
    }
  }

  reservacionValida() : boolean{
    let b = this.myForm.get('phone').value
    let c = false
    this.reservations.forEach(a => {
      if (a.clientphone == b) {
        return c=true
      }
    })
    return c
  }

}
