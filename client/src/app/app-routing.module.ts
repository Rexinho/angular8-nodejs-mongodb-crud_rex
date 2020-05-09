import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoListComponent } from './components/contacto-list/contacto-list.component';
import { ContactoFormComponent } from './components/contacto-form/contacto-form.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { ContactoComponent } from './components/contacto/contacto.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacto',
    pathMatch: 'full'
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },
  {
    path: 'ingresar',
    component: IngresarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
