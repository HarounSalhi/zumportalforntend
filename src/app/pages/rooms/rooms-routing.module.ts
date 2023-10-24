import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { ManagerRoomsComponent } from './rooms-list/manager-rooms.component';
// import { EquipListComponent } from './equip-list/equip-list.component';

const routes: Routes = [
  {
    path :'',
    children : [
      {
        path : 'roomsList',
        component : RoomsListComponent,
      },
      {
        path : 'roomsRequest',
        component : ManagerRoomsComponent,
      },
      // {
      //   path : 'equipList',
      //   component : EquipListComponent,
      // }
    ]
  } 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
