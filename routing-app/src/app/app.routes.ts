import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";
export const appRoutes: Routes = [
  {path : 'login' , component : LoginComponent},
  {path : 'about' , component : AboutComponent},
];
