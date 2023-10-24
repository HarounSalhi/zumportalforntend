import { Component, OnInit } from '@angular/core';

import { Dayoff } from '../day-off.model';

// 
@Component({
  selector: 'app-day-offgrid',
  templateUrl: './day-offgrid.component.html',
  styleUrls: ['./day-offgrid.component.scss']
})

/**
 * Day-offs-grid component
 */
export class DayoffgridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  dayoffData: Dayoff[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Day-offs' }, { label: 'Day-offs Grid', active: true }];

    // this.dayoffData = dayoffData;
  }

}
