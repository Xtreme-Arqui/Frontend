import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { PublicationsComponent } from "../pages/publications/publications.component";
import { MonitoringComponent } from "../pages/monitoring/monitoring.component";
import { ProfileAgencyComponent } from "../pages/profile-agency/profile-agency.component";
import { RouteDetailComponent } from "../pages/route-detail/route-detail.component";
import { AddRouteComponent } from "../pages/add-route/add-route.component";
import { EditRouteComponent } from "../pages/edit-route/edit-route.component";
import { AccountAgencyComponent } from "../pages/account-agency/account-agency.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, children: [
        { path: 'services', component: PublicationsComponent },
        { path: 'monitoring', component: MonitoringComponent },
        { path: 'profile', component: ProfileAgencyComponent },
        { path: 'route-detail/:id', component: RouteDetailComponent },
        { path: 'add-route', component: AddRouteComponent },
        { path: 'edit-route/:id', component: EditRouteComponent },
        { path: 'account', component: AccountAgencyComponent }
      ]
    }
    ])
  ]
})
export class AgencyModule {}