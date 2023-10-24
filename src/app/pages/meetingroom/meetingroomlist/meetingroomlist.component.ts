import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { UserProfileService } from "src/app/core/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { Meetingroom } from "../meetingroom.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { MeetingroomService } from "src/app/core/services/meetingroom.service";
import { Projet } from "src/app/core/models/projet";




@Component({
  selector: 'app-meetingroomlist',
  templateUrl: './meetingroomlist.component.html',
  styleUrls: ['./meetingroomlist.component.scss']
})
export class MeetingroomlistComponent implements OnInit {
  submitted = false;
  breadCrumbItems: Array<{}>;
  meetingrooms: any[]=[];
  noData = true;
  updatingError;
  meetingroomToUpdate;
  meetingroomDetail;
  meetingroomUpdated = false;
  selectValue: Array<{}>;
  statusValue: Array<{}>;
  meetingroomToDelete;
  indexTodelete;
  deleted = false;
  deleteError = false;
  formUpdate: FormGroup;
  formDetail: FormGroup;
  page = 1;
  alignpage1 = 1;
  dateMeetingroom: any;
  dataproj: any;
  date;
  loggedUser;
  selectedMeetingroom:number;


  constructor(private router:Router,private meetingroomservice: MeetingroomService, private route: ActivatedRoute, private UserProfileService: UserProfileService,
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
    this.breadCrumbItems = [{ label: 'Meetingrooms' }, { label: 'Meetingrooms List', active: true }];
    this.getAll();
    this.getallusers();
    this.formUpdate = new FormGroup({
      meetingroom_name: new FormControl('', [Validators.required]),
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
    this.meetingroomservice.getAll().subscribe(result => {
      this.meetingrooms = result.results;
      console.log(this.meetingrooms[0]["starter_at"])
      console.log('results', this.meetingrooms);
      if (this.meetingrooms.length > 0) {
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

  openUpdateModal(template: TemplateRef<any>, meetingroom) {/* 2022/mm/dd */
    this.openModal2(template);
    this.meetingroomToUpdate = meetingroom;
    let d1, d2, date1, date2;
    date1 = this.meetingroomToUpdate.starter_at;
    date2 = this.meetingroomToUpdate.end_date;
    d1 = formatDate(date1, 'dd/MM/yyyy', 'en_US')
    d2 = formatDate(date2, 'dd/MM/yyyy', 'en_US')
    console.log(d1 , d2 ,"test")
    this.date = d1.concat("-", d2.toString())
    this.selected = this.date
    this.formUpdate = this.formBuilder.group({
      meetingroom_name: [meetingroom.name, Validators.required,],
      assigned_to: [meetingroom.assigned_to, Validators.required,],
      selected: [this.date, Validators.required],
      status: [meetingroom.status, Validators.required],
    })

  }

  // fixingCode(newMeetingroom: Meetingroom) {
  //   console.log("fixing")
  //   /**** form.value ******/
  //   this.meetingroomToUpdate.id = newMeetingroom.id;
  //   this.meetingroomToUpdate.status = newMeetingroom.status;
  //   this.meetingroomToUpdate.name = newMeetingroom.name;
  //   this.meetingroomToUpdate.description = newMeetingroom.description;
  //   this.meetingroomToUpdate.assigned_to = newMeetingroom.assigned_to;
  //   this.meetingroomToUpdate.created_by = newMeetingroom.created_by;
  //   /********date *******/
  //   console.log("testing date ")
  //   let d1, d2;
  //   d1 = this.dateMeetingroom[0];
  //   d2 = this.dateMeetingroom[1];
  //   console.log("d1,d2", d1, d2)
  //   let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
  //   let date2 = d2.split("/", 3)
  //   console.log("date:", date1, date2)
  //   d1 = date1[1] + "/" + date1[0] + "/" + date1[2]
  //   d2 = date2[1] + "/" + date2[0] + "/" + date2[2]
  //   console.log("datestart", d1, "dateFin", d2)
  //   let start = formatDate(d1, 'yyyy-MM-dd', 'en_US')
  //   let end = formatDate(d2, 'yyyy-MM-dd', 'en_US')
  //   this.meetingroomToUpdate.starter_at = start;
  //   this.meetingroomToUpdate.end_date = end;
  //   console.log("starter_at:", start)
  //   console.log("end_date:", end)
  // }


  openDetailModal(template: TemplateRef<any>, meetingroom) {
    this.openModal(template);
    this.meetingroomDetail = meetingroom;
    this.formDetail = this.formBuilder.group({
      assigned_to: [meetingroom.assigned_to, Validators.required,],
      descreption: [meetingroom.description, Validators.required],
    })
  }

  update() {
    if (this.formUpdate.valid) {
      let assigned_user = [];
      this.f.assigned_to.value.forEach(element => {
        assigned_user.push(element.id);
      });
      this.dateMeetingroom = this.selected.split("-", 2)
      if((this.dateMeetingroom[0] != this.date['startdate']) && (this.dateMeetingroom[1] != this.date['enddate'])) {
        if (this.dateMeetingroom[0] != '') {
          this.traiterInput();
        }}
      let meetingroomtoUpdate = {
        'id': this.meetingroomToUpdate.id,
        'name': this.f.meetingroom_name.value,
        'description': this.meetingroomToUpdate.description,
        'assigned_to': assigned_user,
        'created_by': this.meetingroomToUpdate.created_by.id,
        'status': this.f.status.value,
        'starter_at': this.meetingroomToUpdate.starter_at,
        'end_date': this.meetingroomToUpdate.end_date
      }
       
      console.log("meetingroomtoUpdate", meetingroomtoUpdate)
        this.meetingroomservice.updatemeetingroom(meetingroomtoUpdate).subscribe(result => {
        this.meetingroomUpdated = true;
        this.getAll();
      }, error => {
        this.meetingroomUpdated = false;
        this.updatingError = true;
      });
      this.modalService.dismissAll();
    }
  }
  
  traiterInput(){/* (14/mm/yyyy-dd/mmm/yyyy ====> yyyyy-mm-dd) */
    let d1, d2;
    console.log(this.dateMeetingroom)
    d1 = this.dateMeetingroom[0];
    d2 = this.dateMeetingroom[1];
    console.log("d1,d2", d1, d2)
    let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
    let date2 = d2.split("/", 3)
    d1 = date1[2] + "-" + date1[1] + "-" + date1[0]
    d2 = date2[2] + "-" + date2[1] + "-" + date2[0]
    console.log("date:", date1, date2)
    console.log("datestart", d1, "dateFin", d2)
    this.meetingroomToUpdate.starter_at = d1;
    this.meetingroomToUpdate.end_date = d2;
    }

  openDeleteModal(confirmDelete: TemplateRef<any>, meetingrooms) {
    this.meetingroomToDelete = meetingrooms;
    this.openModadelete(confirmDelete);
  }

  confirm() {
    this.meetingroomservice.deleteMeetingrooms(this.meetingroomToDelete.id).subscribe(result => {
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
      this.dateMeetingroom = this.selected.split("-", 2)
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

  public tasksbyMeetingroom(meetingroom:Projet){
    this.selectedMeetingroom=meetingroom.id;
    console.log('selected meetingroom',this.selectedMeetingroom)
    this.router.navigate(['/p/tasks/list', meetingroom.id]);
  } 
  
}
