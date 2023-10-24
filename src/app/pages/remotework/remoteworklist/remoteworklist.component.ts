import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { UserProfileService } from "src/app/core/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { Remotework } from "../remotework.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { RemoteworkService } from "src/app/core/services/remotework.service";
import { Projet } from "src/app/core/models/projet";




@Component({
  selector: 'app-remoteworklist',
  templateUrl: './remoteworklist.component.html',
  styleUrls: ['./remoteworklist.component.scss']
})
export class RemoteworklistComponent implements OnInit {
  submitted = false;
  breadCrumbItems: Array<{}>;
  remoteworks: any[]=[];
  noData = true;
  updatingError;
  remoteworkToUpdate;
  remoteworkDetail;
  remoteworkUpdated = false;
  selectValue: Array<{}>;
  statusValue: Array<{}>;
  remoteworkToDelete;
  indexTodelete;
  deleted = false;
  deleteError = false;
  formUpdate: FormGroup;
  formDetail: FormGroup;
  page = 1;
  alignpage1 = 1;
  dateRemotework: any;
  dataproj: any;
  date;
  loggedUser;
  selectedRemotework:number;


  constructor(private router:Router,private remoteworkservice: RemoteworkService, private route: ActivatedRoute, private UserProfileService: UserProfileService,
    private modalService: NgbModal, private formBuilder: FormBuilder, private authServ: AuthenticationService) {
    this.statusValue = ['INPROGRESS', 'APPROUVED', 'DECLINED'];
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
    this.breadCrumbItems = [{ label: 'Remoteworks' }, { label: 'Remoteworks List', active: true }];
    if (this.loggedUser=="MG"){
      this.getAll();
    }else {
      this.remoteworkservice.listRemoteworkByCreator(this.authServ.getUserFromLocalCache().firstname+' '+this.authServ.getUserFromLocalCache().lastname)
    }
    
    this.getallusers();
    this.formUpdate = new FormGroup({
      remotework_name: new FormControl(['', Validators.required,]),
      remotework_position: new FormControl(['', Validators.required,]),
      remotework_nbdays: new FormControl(['', Validators.required,]),
      remotework_motif: new FormControl(['', Validators.required,]),
      remotework_status: new FormControl(['', Validators.required,]),

      // assigned_to: ['', Validators.required,],
      // remotework_description: ['', Validators.required],
      selected: new FormControl(['', Validators.required]),
    });

    this.formDetail = new FormGroup({
      assigned_to: new FormControl(['', Validators.required,]),
      descreption: new FormControl(['', Validators.required,]),
    });
  }


  getAll() {
    this.remoteworkservice.getAll().subscribe(result => {
      this.remoteworks = result.results;
      console.log(this.remoteworks[0]["starter_at"])
      console.log('results', this.remoteworks);
      if (this.remoteworks.length > 0) {
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

  openUpdateModal(template: TemplateRef<any>, remotework) {/* 2022/mm/dd */
    this.openModal2(template);
    this.remoteworkToUpdate = remotework;
    let d1, d2, date1, date2;
    date1 = this.remoteworkToUpdate.startdate;
    date2 = this.remoteworkToUpdate.returndate;
    d1 = formatDate(date1, 'dd/MM/yyyy', 'en_US')
    d2 = formatDate(date2, 'dd/MM/yyyy', 'en_US')
    console.log(d1 , d2 ,"test")
    this.date = d1.concat("-", d2.toString())
    this.selected = this.date
    this.formUpdate = this.formBuilder.group({
      remotework_name: [remotework.name, Validators.required,],
      remotework_position: [remotework.position, Validators.required,],
      remotework_nbdays: [remotework.nbdays, Validators.required,],
      remotework_motif: [remotework.motif, Validators.required,],
      assigned_to: [remotework.assigned_to, Validators.required,],
      selected: [remotework.selected, Validators.required],
      remotework_status: [remotework.status, Validators.required],
    })

  }

  // fixingCode(newRemotework: Remotework) {
  //   console.log("fixing")
  //   /**** form.value ******/
  //   this.remoteworkToUpdate.id = newRemotework.id;
  //   this.remoteworkToUpdate.status = newRemotework.status;
  //   this.remoteworkToUpdate.name = newRemotework.name;
  //   this.remoteworkToUpdate.description = newRemotework.description;
  //   this.remoteworkToUpdate.assigned_to = newRemotework.assigned_to;
  //   this.remoteworkToUpdate.created_by = newRemotework.created_by;
  //   /********date *******/
  //   console.log("testing date ")
  //   let d1, d2;
  //   d1 = this.dateRemotework[0];
  //   d2 = this.dateRemotework[1];
  //   console.log("d1,d2", d1, d2)
  //   let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
  //   let date2 = d2.split("/", 3)
  //   console.log("date:", date1, date2)
  //   d1 = date1[1] + "/" + date1[0] + "/" + date1[2]
  //   d2 = date2[1] + "/" + date2[0] + "/" + date2[2]
  //   console.log("datestart", d1, "dateFin", d2)
  //   let start = formatDate(d1, 'yyyy-MM-dd', 'en_US')
  //   let end = formatDate(d2, 'yyyy-MM-dd', 'en_US')
  //   this.remoteworkToUpdate.starter_at = start;
  //   this.remoteworkToUpdate.end_date = end;
  //   console.log("starter_at:", start)
  //   console.log("end_date:", end)
  // }


  openDetailModal(template: TemplateRef<any>, remotework) {
    this.openModal(template);
    this.remoteworkDetail = remotework;
    this.formDetail = this.formBuilder.group({
      remotework_name: [remotework.name, Validators.required,],
      remotework_position: [remotework.position, Validators.required,],
      remotework_nbdays: [remotework.nbdays, Validators.required,],
      remotework_motif: [remotework.motif, Validators.required,],
      assigned_to: [remotework.assigned_to, Validators.required,],
      selected: [remotework.selected, Validators.required],
      remotework_status: [remotework.status, Validators.required],
      // assigned_to: [remotework.assigned_to, Validators.required,],
      // descreption: [remotework.description, Validators.required],
    })
  }

  update() {
    if (this.formUpdate.valid) {
      let assigned_user = [];
      this.f.assigned_to.value.forEach(element => {
        assigned_user.push(element.id);
      });
      this.dateRemotework = this.selected.split("-", 2)
      if((this.dateRemotework[0] != this.date['startdate']) && (this.dateRemotework[1] != this.date['enddate'])) {
        if (this.dateRemotework[0] != '') {
          this.traiterInput();
        }}
      let remoteworktoUpdate = {
        // 'id': this.remoteworkToUpdate.id,
        // 'name': this.f.remotework_name.value,
        // 'description': this.remoteworkToUpdate.description,
        // 'assigned_to': assigned_user,
        // 'created_by': this.remoteworkToUpdate.created_by.id,
        // 'status': this.f.status.value,
        // 'starter_at': this.remoteworkToUpdate.starter_at,
        // 'end_date': this.remoteworkToUpdate.end_date

        'name': this.f.remotework_name.value,
        'position': this.f.remotework_position.value,
        'nbdays': this.f.remotework_nbdays.value,
        'createdate': this.f.remotework_createdate.value,
        'motif': this.f.remotework_motif.value,
        'creator': this.loggedUser,
        'status': this.f.remotework_status.value,
      }
       
      console.log("remoteworktoUpdate", remoteworktoUpdate)
        this.remoteworkservice.updateremotework(remoteworktoUpdate).subscribe(result => {
        this.remoteworkUpdated = true;
        this.getAll();
      }, error => {
        this.remoteworkUpdated = false;
        this.updatingError = true;
      });
      this.modalService.dismissAll();
    }
  }
  
  traiterInput(){/* (14/mm/yyyy-dd/mmm/yyyy ====> yyyyy-mm-dd) */
    let d1, d2;
    console.log(this.dateRemotework)
    d1 = this.dateRemotework[0];
    d2 = this.dateRemotework[1];
    console.log("d1,d2", d1, d2)
    let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
    let date2 = d2.split("/", 3)
    d1 = date1[2] + "-" + date1[1] + "-" + date1[0]
    d2 = date2[2] + "-" + date2[1] + "-" + date2[0]
    console.log("date:", date1, date2)
    console.log("datestart", d1, "dateFin", d2)
    this.remoteworkToUpdate.starter_at = d1;
    this.remoteworkToUpdate.end_date = d2;
    }

  openDeleteModal(confirmDelete: TemplateRef<any>, remoteworks) {
    this.remoteworkToDelete = remoteworks;
    this.openModadelete(confirmDelete);
  }

  confirm() {
    this.remoteworkservice.deleteRemoteworks(this.remoteworkToDelete.id).subscribe(result => {
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
      this.dateRemotework = this.selected.split("-", 2)
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

  public tasksbyRemotework(remotework:Projet){
    this.selectedRemotework=remotework.id;
    console.log('selected remotework',this.selectedRemotework)
    this.router.navigate(['/p/tasks/list', remotework.id]);
  } 
  
}
