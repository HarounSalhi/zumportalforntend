import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { UserProfileService } from "src/app/core/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { Equipment } from "../equipment.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { EquipmentService } from "src/app/core/services/equipment.service";
import { Projet } from "src/app/core/models/projet";




@Component({
  selector: 'app-equipmentlist',
  templateUrl: './equipmentlist.component.html',
  styleUrls: ['./equipmentlist.component.scss']
})
export class EquipmentlistComponent implements OnInit {
  submitted = false;
  breadCrumbItems: Array<{}>;
  equipments: any[]=[];
  noData = true;
  updatingError;
  equipmentToUpdate;
  equipmentDetail;
  equipmentUpdated = false;
  selectValue: Array<{}>;
  statusValue: Array<{}>;
  equipmentToDelete;
  indexTodelete;
  deleted = false;
  deleteError = false;
  formUpdate: FormGroup;
  formDetail: FormGroup;
  page = 1;
  alignpage1 = 1;
  dateEquipment: any;
  dataproj: any;
  date;
  loggedUser;
  selectedEquipment:number;


  constructor(private router:Router,private equipmentservice: EquipmentService, private route: ActivatedRoute, private UserProfileService: UserProfileService,
    private modalService: NgbModal, private formBuilder: FormBuilder, private authServ: AuthenticationService) {
    this.statusValue = ['active', 'suspended', 'completed', 'paused'];
  }
  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  selected: any;
  hidden: boolean;
  finaldate: any;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @ViewChild('dp', { static: true }) datePicker: any;

  ngOnInit() {
    this.hidden=true;
    this.loggedUser = this.authServ.getUserFromLocalCache().role;
    this.breadCrumbItems = [{ label: 'Equipments' }, { label: 'Equipments List', active: true }];
    this.getAll();
    this.getallusers();
    this.formUpdate = new FormGroup({
      equipment_name: new FormControl('', [Validators.required]),
      assigned_to: new FormControl(['', Validators.required,]),
      starter_at: new FormControl(['', Validators.required,]),
      status: new FormControl(['', Validators.required,]),
      descreption: new FormControl(['', Validators.required,]),
    });

    this.formDetail = new FormGroup({
      assigned_to: new FormControl(['', Validators.required,]),
      descreption: new FormControl(['', Validators.required,]),
    });
  }


  getAll() {
    this.equipmentservice.getAll().subscribe(result => {
      this.equipments = result.results;
      console.log(this.equipments[0]["starter_at"])
      console.log('results', this.equipments);
      if (this.equipments.length > 0) {
        this.noData = false;
      }
    });
  }

  get f() {
    return this.formUpdate.controls;
  }

  dismiss(modal){
    modal.dismiss();
    this.hidden=true;
  }
  


  getallusers() {
    this.UserProfileService.getallusers().subscribe(
      data => {
        let listUser = data;
        this.selectValue = listUser.results;
        console.log('user**************', this.selectValue);
      })
  }
  /* tesiting  */

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { size: 'lg' });
  }



  openModal2(template: TemplateRef<any>) {
    this.modalService.open(template, { size: 'lg' });
  }

  openModadelete(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
  }

  openUpdateModal(template: TemplateRef<any>, equipment) {/* 2022/mm/dd */
    this.openModal2(template);
    this.equipmentToUpdate = equipment;
    let d1, d2, date1, date2;
    date1 = this.equipmentToUpdate.starter_at;
    date2 = this.equipmentToUpdate.end_date;
    d1 = formatDate(date1, 'dd/MM/yyyy', 'en_US')
    d2 = formatDate(date2, 'dd/MM/yyyy', 'en_US')
    console.log(d1 , d2 ,"test")
    this.date = d1.concat("-", d2.toString())
    this.selected = this.date
    this.formUpdate = this.formBuilder.group({
      equipment_name: [equipment.name, Validators.required,],
      assigned_to: [equipment.assigned_to, Validators.required,],
      selected: [this.date, Validators.required],
      status: [equipment.status, Validators.required],
    })

  }

  // fixingCode(newEquipment: Equipment) {
  //   console.log("fixing")
  //   /**** form.value ******/
  //   this.equipmentToUpdate.id = newEquipment.id;
  //   this.equipmentToUpdate.status = newEquipment.status;
  //   this.equipmentToUpdate.name = newEquipment.name;
  //   this.equipmentToUpdate.description = newEquipment.description;
  //   this.equipmentToUpdate.assigned_to = newEquipment.assigned_to;
  //   this.equipmentToUpdate.created_by = newEquipment.created_by;
  //   /********date *******/
  //   console.log("testing date ")
  //   let d1, d2;
  //   d1 = this.dateEquipment[0];
  //   d2 = this.dateEquipment[1];
  //   console.log("d1,d2", d1, d2)
  //   let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
  //   let date2 = d2.split("/", 3)
  //   console.log("date:", date1, date2)
  //   d1 = date1[1] + "/" + date1[0] + "/" + date1[2]
  //   d2 = date2[1] + "/" + date2[0] + "/" + date2[2]
  //   console.log("datestart", d1, "dateFin", d2)
  //   let start = formatDate(d1, 'yyyy-MM-dd', 'en_US')
  //   let end = formatDate(d2, 'yyyy-MM-dd', 'en_US')
  //   this.equipmentToUpdate.starter_at = start;
  //   this.equipmentToUpdate.end_date = end;
  //   console.log("starter_at:", start)
  //   console.log("end_date:", end)
  // }


  openDetailModal(template: TemplateRef<any>, equipment) {
    this.openModal(template);
    this.equipmentDetail = equipment;
    this.formDetail = this.formBuilder.group({
      assigned_to: [equipment.assigned_to, Validators.required,],
      descreption: [equipment.description, Validators.required],
    })
  }

  update() {
    if (this.formUpdate.valid) {
      let assigned_user = [];
      this.f.assigned_to.value.forEach(element => {
        assigned_user.push(element.id);
      });
      this.dateEquipment = this.selected.split("-", 2)
      if((this.dateEquipment[0] != this.date['startdate']) && (this.dateEquipment[1] != this.date['enddate'])) {
        if (this.dateEquipment[0] != '') {
          this.traiterInput();
        }}
      let equipmenttoUpdate = {
        'id': this.equipmentToUpdate.id,
        'name': this.f.equipment_name.value,
        'description': this.equipmentToUpdate.description,
        'assigned_to': assigned_user,
        'created_by': this.equipmentToUpdate.created_by.id,
        'status': this.f.status.value,
        'starter_at': this.equipmentToUpdate.starter_at,
        'end_date': this.equipmentToUpdate.end_date
      }
       
      console.log("equipmenttoUpdate", equipmenttoUpdate)
        this.equipmentservice.updateequipment(equipmenttoUpdate).subscribe(result => {
        this.equipmentUpdated = true;
        this.getAll();
      }, error => {
        this.equipmentUpdated = false;
        this.updatingError = true;
      });
      this.modalService.dismissAll();
    }
  }
  
  traiterInput(){/* (14/mm/yyyy-dd/mmm/yyyy ====> yyyyy-mm-dd) */
    let d1, d2;
    console.log(this.dateEquipment)
    d1 = this.dateEquipment[0];
    d2 = this.dateEquipment[1];
    console.log("d1,d2", d1, d2)
    let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
    let date2 = d2.split("/", 3)
    d1 = date1[2] + "-" + date1[1] + "-" + date1[0]
    d2 = date2[2] + "-" + date2[1] + "-" + date2[0]
    console.log("date:", date1, date2)
    console.log("datestart", d1, "dateFin", d2)
    this.equipmentToUpdate.starter_at = d1;
    this.equipmentToUpdate.end_date = d2;
    }

  openDeleteModal(confirmDelete: TemplateRef<any>, equipments) {
    this.equipmentToDelete = equipments;
    this.openModadelete(confirmDelete);
  }

  confirm() {
    this.equipmentservice.deleteEquipments(this.equipmentToDelete.id).subscribe(result => {
      this.deleted = true;
      this.getAll();
    });
    this.modalService.dismissAll();
  }

  /* on date selected
   * @param date date object
   */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected = this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString();
      this.dateEquipment = this.selected.split("-", 2)
      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });
      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;
      
    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  // /**
  //  * Is hovered over date
  //  * @param date date obj
  //  */
  isHovered(date: NgbDate) {
    return this.fromNGDate && !this.toNGDate && this.hoveredDate && date.after(this.fromNGDate) && date.before(this.hoveredDate);
  }
  /**
  //  * @param date date obj
  //  */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }
  // /**
  //  * @param date date obj
  //  */
  isRange(date: NgbDate) {
    return date.equals(this.fromNGDate) || date.equals(this.toNGDate) || this.isInside(date) || this.isHovered(date);
  }

  public tasksbyEquipment(equipment:Projet){
    this.selectedEquipment=equipment.id;
    console.log('selected equipment',this.selectedEquipment)
    this.router.navigate(['/p/tasks/list', equipment.id]);
  } 
  
}
