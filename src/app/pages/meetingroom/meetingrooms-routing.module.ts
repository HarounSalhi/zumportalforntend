import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingroomgridComponent } from './meetingroomgrid/meetingroomgrid.component';
import { MeetingroomlistComponent } from './meetingroomlist/meetingroomlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: 'grid',
        component: MeetingroomgridComponent
    },
    {
        path: 'list',
        component: MeetingroomlistComponent
    },
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: 'create',
        component: CreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeetingroomsRoutingModule {}
