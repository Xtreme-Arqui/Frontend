import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderContentComponent} from "./web/components/header-content/header-content.component";
import { PanelComponent} from "./web/components/panel/panel.component";
import { PublicationsComponent} from "./agency/pages/publications/publications.component";
import { ProfileAgencyComponent} from "./agency/pages/profile-agency/profile-agency.component";
import { MonitoringComponent } from './agency/pages/monitoring/monitoring.component';
import { HomeComponent } from './agency/pages/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/services', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, children: [
    {path: 'services', component: PublicationsComponent},
    {path: 'monitoring', component: MonitoringComponent},
    {path: 'profile', component: ProfileAgencyComponent},
    ] 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
