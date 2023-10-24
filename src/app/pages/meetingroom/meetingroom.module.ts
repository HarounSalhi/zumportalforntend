import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingroomsRoutingModule } from './meetingrooms-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MeetingroomgridComponent } from './meetingroomgrid/meetingroomgrid.component';
import { MeetingroomlistComponent } from './meetingroomlist/meetingroomlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [MeetingroomgridComponent, MeetingroomlistComponent, OverviewComponent, CreateComponent],
  imports: [
    CommonModule,
    MeetingroomsRoutingModule,
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

export class MeetingroomsModule { }
