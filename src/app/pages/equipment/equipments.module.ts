import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EquipmentgridComponent } from './equipmentgrid/equipmentgrid.component';
import { EquipmentlistComponent } from './equipmentlist/equipmentlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EquipmentgridComponent, EquipmentlistComponent, OverviewComponent, CreateComponent],
  imports: [
    CommonModule,
    EquipmentsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    DropzoneModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgSelectModule,
  ]
})

export class EquipmentsModule { }
