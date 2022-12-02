import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public validationMessages: Object

  constructor(private fB: FormBuilder, private r: Router) { }

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
    }
    /*if (this.myForm.valid) {
      if (this.reservaValida()) {
        this.gS.setActive(this.gS.getGuestByPhoneNumber(this.myForm.get('phone').value))
        this.gS.setLang(this.checkForLang(this.myForm.get('lang').value));
        this.r.navigate(['/tabs/tab2'], {})
        this.myForm.reset()
      } else {
        let toast = await this.tC.create({
          message: 'Credenciales no válidas',
          duration: 2000
        });
        toast.present();
      }
    } else {
      let toast = await this.tC.create({
        message: 'Llene los campos correctamente',
        duration: 2000
      });
      toast.present();
    }*/

  }

}
