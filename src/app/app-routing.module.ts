import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';

const routes: Routes = [
    { path: 'quien-soy', component: QuiensoyComponent },
    { path: 'home', component: HomeComponent },
    {path:'login',loadChildren: ()=> import('./ingreso/login/login.module').then((m)=>m.LoginModule),},
    { path: 'register', loadChildren: () => import('./ingreso/register/register.module').then(m => m.RegisterModule) },
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }