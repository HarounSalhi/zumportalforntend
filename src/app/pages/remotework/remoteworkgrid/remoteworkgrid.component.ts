import { Component, OnInit } from '@angular/core';

import { Remotework } from '../remotework.model';

// 
@Component({
  selector: 'app-remoteworkgrid',
  templateUrl: './remoteworkgrid.component.html',
  styleUrls: ['./remoteworkgrid.component.scss']
})

/**
 * Remoteworks-grid component
 */
export class RemoteworkgridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  remoteworkData: Remotework[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Remoteworks' }, { label: 'Remoteworks Grid', active: true }];

    // this.remoteworkData = remoteworkData;
  }

}
