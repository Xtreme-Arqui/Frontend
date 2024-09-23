import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderContentComponent} from "./web/components/header-content/header-content.component";
import {PanelComponent} from "./web/components/panel/panel.component";
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileComponent} from "./profile/profile.component";
import {MonitoringComponent} from "./monitoring/monitoring.component";


const routes: Routes = [
  { path: 'home', component: PublicationsComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'monitoring', component: MonitoringComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
