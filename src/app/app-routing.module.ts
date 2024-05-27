import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RedirectGuardService } from '../services/redirect.guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectGuardService],
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
