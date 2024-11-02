import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from "@angular/router";
import { HomeTouristComponent } from "../pages/home-tourist/home-tourist.component";
import { RoutesComponent } from "../pages/routes/routes.component";
import { FilterComponent } from "../pages/filter/filter.component";
import { PackageComponent } from "../pages/package/package.component";
import { AgencyComponent } from "../pages/agency/agency.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeTouristComponent, children: [
          { path: 'routes', component: RoutesComponent },
          { path: 'filters', component: FilterComponent },
          { path: 'package/:id', component: PackageComponent },
          { path: 'agency/:id', component: AgencyComponent }
        ]
      }
    ])
  ]
})
export class HomeModule { }