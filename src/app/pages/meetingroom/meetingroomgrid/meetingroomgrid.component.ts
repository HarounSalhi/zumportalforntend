import { Component, OnInit } from '@angular/core';

import { Meetingroom } from '../meetingroom.model';

// 
@Component({
  selector: 'app-meetingroomgrid',
  templateUrl: './meetingroomgrid.component.html',
  styleUrls: ['./meetingroomgrid.component.scss']
})

/**
 * Meetingrooms-grid component
 */
export class MeetingroomgridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  meetingroomData: Meetingroom[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Meetingrooms' }, { label: 'Meetingrooms Grid', active: true }];

    // this.meetingroomData = meetingroomData;
  }

}
