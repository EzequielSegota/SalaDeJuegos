import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any=null;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token == null)
    {
      this.router.navigateByUrl("login");
    }
  }

}
