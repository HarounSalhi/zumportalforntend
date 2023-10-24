import { Component, OnInit } from '@angular/core';

import { Equipment } from '../equipment.model';

// 
@Component({
  selector: 'app-equipmentgrid',
  templateUrl: './equipmentgrid.component.html',
  styleUrls: ['./equipmentgrid.component.scss']
})

/**
 * Equipments-grid component
 */
export class EquipmentgridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  equipmentData: Equipment[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Equipments' }, { label: 'Equipments Grid', active: true }];

    // this.equipmentData = equipmentData;
  }

}
