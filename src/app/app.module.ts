import { NgModule  } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../shared/material.module";
import { HeaderContentComponent} from "./web/components/header-content/header-content.component";
import { AppRoutingModule} from "./app-routing.module";
import { PanelComponent} from "./web/components/panel/panel.component";
import { MonitoringComponent } from "./agency/pages/monitoring/monitoring.component";
import { LeafletModule} from "@asymmetrik/ngx-leaflet";
import { HomeComponent } from "./agency/pages/home/home.component";
import { PublicationsComponent } from "./agency/pages/publications/publications.component";
import { ProfileAgencyComponent } from "./agency/pages/profile-agency/profile-agency.component";
import { HomeTouristComponent } from "./adventurer/pages/home-tourist/home-tourist.component";
import { PackageComponent } from "./adventurer/pages/package/package.component";
import { RoutesComponent } from "./adventurer/pages/routes/routes.component";
import { FilterComponent } from "./adventurer/pages/filter/filter.component";
import { AgencyComponent } from "./adventurer/pages/agency/agency.component";
import { ProfileComponent } from "./adventurer/pages/profile/profile.component";
import { DataAdventurerComponent } from "./adventurer/pages/data-adventurer/data-adventurer.component";
import { AccountAdventurerComponent } from "./adventurer/pages/account-adventurer/account-adventurer.component";
import { AuthComponent } from "./access/pages/auth/auth.component";
import { AccountAgencyComponent } from "./agency/pages/account-agency/account-agency.component";
import { AddRouteComponent } from "./agency/pages/add-route/add-route.component";
import { EditRouteComponent } from "./agency/pages/edit-route/edit-route.component";
import { RouteDetailComponent } from "./agency/pages/route-detail/route-detail.component";
import { RegisterAgencyComponent } from "./access/pages/register-agency/register-agency.component";
import { RegisterTouristComponent } from "./access/pages/register-tourist/register-tourist.component";

@NgModule({
  declarations: [
      AppComponent,
      HeaderContentComponent,
      PanelComponent,
      PublicationsComponent,
      ProfileAgencyComponent,
      MonitoringComponent,
      HomeComponent,
      HomeTouristComponent,
      PackageComponent,
      RoutesComponent,
      FilterComponent,
      AgencyComponent,
      ProfileComponent,
      DataAdventurerComponent,
      AccountAdventurerComponent,
      AuthComponent,
      AccountAgencyComponent,
      AddRouteComponent,
      EditRouteComponent,
      RouteDetailComponent,
      RegisterAgencyComponent,
      RegisterTouristComponent

    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule,
      MaterialModule,
      AppRoutingModule,
      LeafletModule,
      FormsModule,
      ReactiveFormsModule

    ],
    providers: [],
    bootstrap: [AppComponent]

})

export class AppModule {}
