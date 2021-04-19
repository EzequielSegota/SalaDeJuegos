import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  token:any=null;
  logeado:boolean=false;
  title='Sala de Juegos';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token != null)
    {
      this.logeado=true;
    }
  }

  Deslogearse(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

}
