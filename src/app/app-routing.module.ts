import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderContentComponent} from "./web/components/header-content/header-content.component";
import { PanelComponent} from "./web/components/panel/panel.component";
import { PublicationsComponent} from "./agency/pages/publications/publications.component";
import { ProfileAgencyComponent} from "./agency/pages/profile-agency/profile-agency.component";
import { MonitoringComponent } from './agency/pages/monitoring/monitoring.component';
import { HomeComponent } from './agency/pages/home/home.component';
import { HomeTouristComponent } from './adventurer/pages/home-tourist/home-tourist.component';
import { RoutesComponent } from './adventurer/pages/routes/routes.component';
import { FilterComponent } from './adventurer/pages/filter/filter.component';
import { PackageComponent } from './adventurer/pages/package/package.component';
import { AgencyComponent } from './adventurer/pages/agency/agency.component';
import { ProfileComponent } from './adventurer/pages/profile/profile.component';
import { DataAdventurerComponent } from './adventurer/pages/data-adventurer/data-adventurer.component';
import { AccountAdventurerComponent } from './adventurer/pages/account-adventurer/account-adventurer.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/routes', pathMatch: 'full'},
  { path: 'home', component: HomeTouristComponent, children:[
    { path: 'routes', component: RoutesComponent},
    { path: 'filters', component: FilterComponent},
    { path: 'package/:id', component: PackageComponent},
    { path: 'agency/:id', component: AgencyComponent},
  ]},
  { path: 'profile', component: ProfileComponent, children:[
    { path: 'data', component: DataAdventurerComponent},
    { path: 'account', component: AccountAdventurerComponent}
  ]}
  /*{ path: 'home', component: HomeComponent, children: [
    {path: 'services', component: PublicationsComponent},
    {path: 'monitoring', component: MonitoringComponent},
    {path: 'profile', component: ProfileAgencyComponent},
    ] 
  },*/


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
