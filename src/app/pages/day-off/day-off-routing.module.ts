import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayoffgridComponent } from './day-offgrid/day-offgrid.component';
import { DayofflistComponent } from './day-offlist/day-offlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: 'grid',
        component: DayoffgridComponent
    },
    {
        path: 'list',
        component: DayofflistComponent
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
export class DayoffsRoutingModule {}
