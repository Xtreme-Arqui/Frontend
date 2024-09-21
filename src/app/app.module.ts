import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../shared/material.module";

@NgModule({ 
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]

})

export class AppModule {}