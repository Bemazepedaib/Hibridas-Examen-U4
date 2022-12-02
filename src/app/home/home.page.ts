import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public myForm: FormGroup;
  public validationMessages: Object
  public total:number;
  constructor() {}
  ngOnInit() {

  }
  //Para obtener booleans de alberca, mesa de postres, trampolin, futbolito

}
