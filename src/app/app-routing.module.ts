import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './access/pages/auth/auth.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from '../shared/components/access-denied/access-denied.component';
import { authGuard } from './access/guards/auth.guard';
import { SelectTypeComponent } from './access/pages/select-type/select-type.component';
import { RegisterAgencyComponent } from './access/pages/register-agency/register-agency.component';
import { RegisterTouristComponent } from './access/pages/register-tourist/register-tourist.component';



const routes: Routes = [
  { path: '', redirectTo: '/access', pathMatch: 'full'},
  { path: 'access', component: AuthComponent, pathMatch: 'full'},
  { path: 'select-type', component: SelectTypeComponent, pathMatch: 'full'},
  { path: 'register-agency', component: RegisterAgencyComponent, pathMatch: 'full'},
  { path: 'register-tourist', component: RegisterTouristComponent, pathMatch: 'full'},
  { 
    path: 'home', 
    loadChildren: () => import('./adventurer/adventurer-module/home.module').then(m => m.HomeModule), 
    canActivate: [authGuard], 
    data: { expectedUserType: 'adventurer' } 
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./adventurer/adventurer-module/profile.module').then(m => m.ProfileModule), 
    canActivate: [authGuard], 
    data: { expectedUserType: 'adventurer' } 
  },

  // Carga diferida (Lazy Loading) para el módulo de Agencias
  { 
    path: 'home', 
    loadChildren: () => import('./agency/agency-module/agency.module').then(m => m.AgencyModule), 
    canActivate: [authGuard], 
    data: { expectedUserType: 'agency' } 
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
