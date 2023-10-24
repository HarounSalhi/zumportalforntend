import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteworksRoutingModule } from './remoteworks-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RemoteworkgridComponent } from './remoteworkgrid/remoteworkgrid.component';
import { RemoteworklistComponent } from './remoteworklist/remoteworklist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RemoteworkgridComponent, RemoteworklistComponent, OverviewComponent, CreateComponent],
  imports: [
    CommonModule,
    RemoteworksRoutingModule,
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

export class RemoteworksModule { }
