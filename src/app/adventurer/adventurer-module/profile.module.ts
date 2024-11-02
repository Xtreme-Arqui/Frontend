import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "../pages/profile/profile.component";
import { DataAdventurerComponent } from "../pages/data-adventurer/data-adventurer.component";
import { AccountAdventurerComponent } from "../pages/account-adventurer/account-adventurer.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent, children: [
          { path: 'data', component: DataAdventurerComponent },
          { path: 'account', component: AccountAdventurerComponent }
        ]
      }
    ])
  ]
})
export class ProfileModule { }