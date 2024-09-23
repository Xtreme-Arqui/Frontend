import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../shared/material.module";
import {HeaderContentComponent} from "./web/components/header-content/header-content.component";
import {AppRoutingModule} from "./app-routing.module";
import {PanelComponent} from "./web/components/panel/panel.component";
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileComponent} from "./profile/profile.component";


@NgModule({
    declarations: [
        AppComponent,
        HeaderContentComponent,
      PanelComponent,
      PublicationsComponent,
      ProfileComponent,


    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        MaterialModule,
      AppRoutingModule

    ],
    providers: [],
    bootstrap: [AppComponent]

})

export class AppModule {}
