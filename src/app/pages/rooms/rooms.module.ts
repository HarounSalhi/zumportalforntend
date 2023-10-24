import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { ManagerRoomsComponent } from './rooms-list/manager-rooms.component';

// import { EquipListComponent } from './equip-list/equip-list.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [
    RoomsListComponent,
    ManagerRoomsComponent
    // EquipListComponent,
    
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
   // BrowserModule, 
    // NgbModule,
    ReactiveFormsModule,

  ] ,
   providers: [],
   bootstrap: [RoomsListComponent]
})
export class RoomsModule { }
