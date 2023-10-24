import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoteworkgridComponent } from './remoteworkgrid/remoteworkgrid.component';
import { RemoteworklistComponent } from './remoteworklist/remoteworklist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: 'grid',
        component: RemoteworkgridComponent
    },
    {
        path: 'list',
        component: RemoteworklistComponent
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
export class RemoteworksRoutingModule {}
