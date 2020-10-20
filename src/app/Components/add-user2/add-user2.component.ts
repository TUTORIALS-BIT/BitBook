import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import * as moment from 'moment';

@Component({
  selector: 'app-add-user2',
  templateUrl: './add-user2.component.html',
  styleUrls: ['./add-user2.component.css']
})
export class AddUser2Component implements OnInit {

  createUserForm2: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.createUserForm2 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      birthDate: ['', [Validators.required, this.validateBirthDateField] ],
      role: ['User', Validators.required],
    })
  }

  validateBirthDateField(control: AbstractControl){
    
    const fechaActual = moment( new Date(), 'YYYY-MM-DD' ).unix()
    const fechaNacimiento = moment( control.value, 'YYYY-MM-DD' ).unix()
    const menorEdad = moment( new Date(), 'YYYY-MM-DD' ).subtract('18', 'years').unix()

    const suma = moment().add('5', 'months')
    console.log(suma)
    
    if(fechaActual < fechaNacimiento){
      return { fechaFuturo: true }
    }

    /*if(menorEdad < fechaNacimiento){
      return { menorEdad: true }
    }*/

    return null
  }

  saveUser(){
    if(this.createUserForm2.valid){

    }else{
      alert('Tienes errores en el formularioo')
    }
  }

}
