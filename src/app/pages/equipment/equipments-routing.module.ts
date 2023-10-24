import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentgridComponent } from './equipmentgrid/equipmentgrid.component';
import { EquipmentlistComponent } from './equipmentlist/equipmentlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: 'grid',
        component: EquipmentgridComponent
    },
    {
        path: 'list',
        component: EquipmentlistComponent
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
export class EquipmentsRoutingModule {}
