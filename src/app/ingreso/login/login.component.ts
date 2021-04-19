import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicio/registro/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  errorTexto: string;
  usuario:Usuario=new Usuario();

  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private router: Router, private usuarioFire: LoginService) {

  }

  ngOnInit(): void {
  }

  Login(){
    this.errorTexto = '';
    if(this.formLogin.valid)
    {
      console.log("validaciones ok");
      this.usuario.username=this.formLogin.get('username').value;
      this.usuario.password=this.formLogin.get('password').value;
      this.usuarioFire.BuscarUsuario(this.usuario).valueChanges().subscribe((result) => {
        if (result.length == 1) {
          localStorage.setItem('token', this.usuario.username);
          console.log(localStorage.getItem('token'));
          this.router.navigateByUrl('home');
        } else {
          this.setError(true);
        }
      });
    }
    else
    {
      this.setError();
    }
  }

  setError(userInvalid?:boolean){
    this.error = true;
    if (this.formLogin.get('username').errors?.required || this.formLogin.get('username').errors?.minLength) {
      console.log(this.formLogin.get('password').errors?.required);
      this.errorTexto += 'Tu nombre debe tener 5 caracteres min. <br>';
    }
    if (this.formLogin.get('password').errors?.required || this.formLogin.get('password').errors?.minLength) {
      console.log(this.formLogin.get('password').errors?.required);
      this.errorTexto += 'Tu contraseña debe tener 8 caracteres min. <br>';
    }
    if(userInvalid){
      this.errorTexto+='No existe un usuario con esas credenciales!';
    }
  }
}
