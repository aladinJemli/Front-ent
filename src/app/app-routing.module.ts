import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoverFormComponent } from './rover-form/rover-form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'rover',
    pathMatch: 'full',
  },
  {
    path: 'rover',
    component: RoverFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
