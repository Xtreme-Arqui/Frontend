import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderContentComponent} from "./web/components/header-content/header-content.component";
import {PanelComponent} from "./web/components/panel/panel.component";
import {PublicationsComponent} from "./publications/publications.component";


const routes: Routes = [
  { path: 'home', component: PublicationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
