import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.page.html',
  styleUrls: ['./add-reservation.page.scss'],
})
export class AddReservationPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object
  public now = new Date(Date.now()).toISOString()
  public total = 1000
  public brinco = false
  public mesa = false
  public futbo = false
  public alber = 100

  constructor(private fB: FormBuilder, private rS: ReservationService, private tC: ToastController) { }

  ngOnInit() {
    this.myForm = this.fB.group({
      date: ["", Validators.compose([Validators.required])],
      alber: [""]
    });
    this.validationMessages = {
      'date': [
        { type: 'required', message: "Fecha obligatoria" }
      ]
    }
  }

  public coincidencia(): Boolean{
    let a:Reservation[] = this.rS.getDates()
    let c = false
    a.forEach(e => {
      if (e.fecha.split('T')[0] == this.myForm.get('date').value.split('T')[0]){
        return c = true
      }
    });
    return c
  }

  public async addReservation(){
    
    if (!this.coincidencia()){
    this.total += this.alber
    let res: Reservation = {
      clientname: "a",
      clientphone: 'a',
      alberca: this.alber,
      fecha: this.newDate(this.myForm.get('date').value).toISOString(),
      futbolito: this.futbo,
      mesaDePostres: this.mesa,
      trampolin: this.brinco,
      montoTotal: this.total
    }
    this.rS.newReservation(res);
    } else {
      let toast = await this.tC.create({
        message: 'La fecha ya está reservada',
        duration: 2000
      });
      toast.present();
    }
  }

  public toggleValue1(){
    this.brinco = !this.brinco 
    if (this.brinco){
      this.total += 200
    } else {
      this.total -= 200
    }
  }

  public toggleValue2(){
    this.mesa = !this.mesa    
    if (this.mesa){
      this.total += 150
    } else {
      this.total -= 150
    }
  }

  public toggleValue3(){
    this.futbo = !this.futbo
    if (this.futbo){
      this.total += 100
    } else {
      this.total -= 100
    }
  }

  public alberValue(){
    this.alber = this.myForm.get('alber').value*this.alber 
  }

  pinFormatter(value: number) {
    return `${value*20}%`;
  }

  public newDate(d: string): Date {
    return new Date(d)
  }

}
