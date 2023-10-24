import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayoffsRoutingModule } from './day-off-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DayoffgridComponent } from './day-offgrid/day-offgrid.component';
import { DayofflistComponent } from './day-offlist/day-offlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [DayoffgridComponent, DayofflistComponent, OverviewComponent, CreateComponent],
  imports: [
    CommonModule,
    DayoffsRoutingModule,
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

export class DayoffsModule { }
