import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicio/registro/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  errorTexto: string;
  usuario: Usuario = new Usuario();


  formRegistro: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  constructor(private router: Router, private usuarioFire: LoginService) {

  }

  Registrar() {
    this.errorTexto = '';
    if (this.formRegistro.valid && this.CheckPasswords()) {
      //console.log(this.formRegistro.get('nombre').value);
      console.log('Pasaste las validaciones!');
      this.usuario.username=this.formRegistro.get('nombre').value;
      this.usuario.email=this.formRegistro.get('email').value;
      this.usuario.password=this.formRegistro.get('password').value;

      this.usuarioFire.Crear(this.usuario);
      this.router.navigateByUrl('login');
      }
    else {
      this.setError();
    }

  }

  CheckPasswords(): boolean {
    if (this.formRegistro.get('password').value == this.formRegistro.get('repeatPassword').value) {
      console.log('contraseñas iguales!');
      return true;
    }
    console.log('contraseñas diferentes!');
    return false;
  }

  setError() {
    this.error = true;
    if (this.formRegistro.get('nombre').errors?.required || this.formRegistro.get('nombre').errors?.minLength) {
      console.log(this.formRegistro.get('nombre').errors?.required);
      this.errorTexto += 'Tu nombre debe tener 5 caracteres min. <br>';
    }
    if (this.formRegistro.get('email').errors?.required || this.formRegistro.get('email').errors?.email) {
      this.errorTexto += 'Revisa tu mail. <br>';
    }
    if (this.formRegistro.get('password').errors?.required || this.formRegistro.get('password').errors?.minLength) {
      this.errorTexto += 'La contraseña debe tener 8 caracteres min. <br>';
    }
    if (this.formRegistro.get('repeatPassword').errors?.required || this.formRegistro.get('repeatPassword').errors?.minLength) {
      this.errorTexto += 'La contraseña repetida debe tener 8 caracteres min. <br>';
    }
    if (!this.CheckPasswords()) {
      this.errorTexto += 'Las contraseñas no coinciden!';
    }
  }

  ngOnInit(): void {
  }

}
