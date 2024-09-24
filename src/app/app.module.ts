import { NgModule  } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
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

@NgModule({
  declarations: [
      AppComponent,
      HeaderContentComponent,
      PanelComponent,
      PublicationsComponent,
      ProfileAgencyComponent,
      MonitoringComponent,
      HomeComponent,


    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule,
      MaterialModule,
      AppRoutingModule,
      LeafletModule,


    ],
    providers: [],
    bootstrap: [AppComponent]

})

export class AppModule {}
