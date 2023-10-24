import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { UserProfileService } from "src/app/core/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { Dayoff } from "../day-off.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { DayoffService } from "src/app/core/services/dayoff.service";




@Component({
  selector: 'app-day-offlist',
  templateUrl: './day-offlist.component.html',
  styleUrls: ['./day-offlist.component.scss']
})
export class DayofflistComponent implements OnInit {
  submitted = false;
  breadCrumbItems: Array<{}>;
  dayoffs: any[]=[];
  noData = true;
  updatingError;
  dayoffToUpdate;
  dayoffDetail;
  dayoffUpdated = false;
  selectValue: Array<{}>;
  typeValue: Array<{}>;
  dayoffToDelete;
  dayoffToApprouve;
  dayoffToDecline;
  indexTodelete;
  deleted = false;
  deleteError = false;
  formUpdate: FormGroup;
  formDetail: FormGroup;
  page = 1;
  alignpage1 = 1;
  dateDayoff: any;
  dataproj: any;
  date;
  loggedUser;
  selectedDayoff:number;


  constructor(private router:Router,private dayoffservice: DayoffService, private route: ActivatedRoute, private UserProfileService: UserProfileService,
    private modalService: NgbModal, private formBuilder: FormBuilder, private authServ: AuthenticationService) {
    this.typeValue = ['PERSONAL LEAVE','ANNUAL LEAVE', 'EMMERGENCY LEAVE', 'RECOVERY LEAVE'];
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
    console.log("ng on init")
    this.hidden=true;
    this.loggedUser = this.authServ.getUserFromLocalCache().role;
    this.breadCrumbItems = [{ label: 'Dayoffs' }, { label: 'Dayoffs List', active: true }];
    if (this.loggedUser=="MG"){
      this.getAll();
    }else {
      this.dayoffservice.listDayoffByCreator(this.authServ.getUserFromLocalCache().firstname+' '+this.authServ.getUserFromLocalCache().lastname)
    }
      this.getallusers();
      this.formUpdate = new FormGroup({
      dayoff_name:new FormControl(['', Validators.required,]),
      dayoff_position:new FormControl(['', Validators.required,]),
      dayoff_nbdays:new FormControl(['', Validators.required,]),
      dayoff_type:new FormControl(['', Validators.required,]),
      Backupperson:new FormControl(['',Validators.required,]),
      dayoff_motif:new FormControl(['', Validators.required,]),
      selected:new FormControl(['', Validators.required]),
    });

    this.formDetail = new FormGroup({
      assigned_to: new FormControl(['', Validators.required,]),
      descreption: new FormControl(['', Validators.required,]),
    });
  }


  getAll() {
    this.dayoffservice.getAll().subscribe(result => {
      console.log(result)
      this.dayoffs = result.results;
      console.log(this.dayoffs[0]["starter_at"])
      console.log('results', this.dayoffs);
      if (this.dayoffs.length > 0) {
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

  openModaapprouve(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
  }

  openModadecline(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
  }

  openUpdateModal(template: TemplateRef<any>, dayoff) {/* 2022/mm/dd */
    console.log(dayoff)
    this.openModal2(template);
    this.dayoffToUpdate = dayoff;
    let d1, d2, date1, date2;
    date1 = this.dayoffToUpdate.startdate;
    date2 = this.dayoffToUpdate.returndate;
    d1 = formatDate(date1, 'dd/MM/yyyy', 'en_US')
    d2 = formatDate(date2, 'dd/MM/yyyy', 'en_US')
    console.log(d1 , d2 ,"test")
    this.date = d1.concat("-", d2.toString())
    this.selected = this.date
    this.formUpdate = this.formBuilder.group({
      dayoff_name: [dayoff.name, Validators.required,],
      dayoff_position:[dayoff.position, Validators.required,],
      dayoff_nbdays:[dayoff.nbdays, Validators.required,],
      dayoff_type:[dayoff.type, Validators.required,],
      dayoff_backupperson:[dayoff.backupperson,Validators.required,],
      dayoff_motif:[dayoff.motif, Validators.required,],
      selected: [this.date, Validators.required],
    })

  }

  // fixingCode(newDayoff: Dayoff) {
  //   console.log("fixing")
  //   /**** form.value ******/
  //   this.dayoffToUpdate.id = newDayoff.id;
  //   this.dayoffToUpdate.status = newDayoff.status;
  //   this.dayoffToUpdate.name = newDayoff.name;
  //   this.dayoffToUpdate.description = newDayoff.description;
  //   this.dayoffToUpdate.assigned_to = newDayoff.assigned_to;
  //   this.dayoffToUpdate.created_by = newDayoff.created_by;
  //   /********date *******/
  //   console.log("testing date ")
  //   let d1, d2;
  //   d1 = this.dateDayoff[0];
  //   d2 = this.dateDayoff[1];
  //   console.log("d1,d2", d1, d2)
  //   let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
  //   let date2 = d2.split("/", 3)
  //   console.log("date:", date1, date2)
  //   d1 = date1[1] + "/" + date1[0] + "/" + date1[2]
  //   d2 = date2[1] + "/" + date2[0] + "/" + date2[2]
  //   console.log("datestart", d1, "dateFin", d2)
  //   let start = formatDate(d1, 'yyyy-MM-dd', 'en_US')
  //   let end = formatDate(d2, 'yyyy-MM-dd', 'en_US')
  //   this.dayoffToUpdate.starter_at = start;
  //   this.dayoffToUpdate.end_date = end;
  //   console.log("starter_at:", start)
  //   console.log("end_date:", end)
  // }


  openDetailModal(template: TemplateRef<any>, dayoff) {
    this.openModal(template);
    this.dayoffDetail = dayoff;
    this.formDetail = this.formBuilder.group({
      dayoff_name: [dayoff.name, Validators.required,],
      dayoff_position:[dayoff.position, Validators.required,],
      dayoff_nbdays:[dayoff.nbdays, Validators.required,],
      dayoff_createdate:[dayoff.createdate, Validators.required,],
      dayoff_startdate:[dayoff.startdate, Validators.required,],
      dayoff_retrundate:[dayoff.returndate, Validators.required,],
      dayoff_type:[dayoff.type, Validators.required,],
      dayoff_backupperson:[dayoff.backupperson,Validators.required,],
      dayoff_motif:[dayoff.motif, Validators.required,],
      selected: [this.date, Validators.required],
      // assigned_to: [dayoff.assigned_to, Validators.required,],
      // descreption: [dayoff.description, Validators.required],
    })
  }

  update() {
    if (this.formUpdate.valid) {
      let assigned_user = [];
      this.f.assigned_to.value.forEach(element => {
        assigned_user.push(element.id);
      });
      this.dateDayoff = this.selected.split("-", 2)
      if((this.dateDayoff[0] != this.date['startdate']) && (this.dateDayoff[1] != this.date['enddate'])) {
        if (this.dateDayoff[0] != '') {
          this.traiterInput();
        }}
      let dayofftoUpdate = {
        'id': this.dayoffToUpdate.id,
        'name': this.f.dayoff_name.value,
        'description': this.dayoffToUpdate.description,
        'assigned_to': assigned_user,
        'created_by': this.dayoffToUpdate.created_by.id,
        'status': this.f.status.value,
        'starter_at': this.dayoffToUpdate.starter_at,
        'end_date': this.dayoffToUpdate.end_date
      }
       
      console.log("dayofftoUpdate", dayofftoUpdate)
        this.dayoffservice.updatedayoff(dayofftoUpdate).subscribe(result => {
        this.dayoffUpdated = true;
        this.getAll();
      }, error => {
        this.dayoffUpdated = false;
        this.updatingError = true;
      });
      this.modalService.dismissAll();
    }
  }
  
  traiterInput(){/* (14/mm/yyyy-dd/mmm/yyyy ====> yyyyy-mm-dd) */
    let d1, d2;
    console.log(this.dateDayoff)
    d1 = this.dateDayoff[0];
    d2 = this.dateDayoff[1];
    console.log("d1,d2", d1, d2)
    let date1 = d1.split("/", 3) //[19 ,10, 2022 ]
    let date2 = d2.split("/", 3)
    d1 = date1[2] + "-" + date1[1] + "-" + date1[0]
    d2 = date2[2] + "-" + date2[1] + "-" + date2[0]
    console.log("date:", date1, date2)
    console.log("datestart", d1, "dateFin", d2)
    this.dayoffToUpdate.starter_at = d1;
    this.dayoffToUpdate.end_date = d2;
    }

  openDeleteModal(confirmDelete: TemplateRef<any>, dayoffs) {
    this.dayoffToDelete = dayoffs;
    this.openModadelete(confirmDelete);
  }

  confirm() {
    this.dayoffservice.deleteDayoffs(this.dayoffToDelete.id).subscribe(result => {
      this.deleted = true;
      this.getAll();
    });
    this.modalService.dismissAll();
  }

  openApprouveModal(confirmApprouve: TemplateRef<any>, dayoff) {
    console.log(this.dayoffToApprouve)
    this.dayoffToApprouve = dayoff;
    this.openModaapprouve(confirmApprouve);
  }

  approuve() {
    this.dayoffservice.approuvedayoff(this.dayoffToApprouve).subscribe(result => {
      this.dayoffUpdated = true;
      this.getAll();
    });
    this.modalService.dismissAll();
  }

  openDeclineModal(confirmDecline: TemplateRef<any>, dayoff) {
    this.dayoffToDecline = dayoff;
    this.openModadecline(confirmDecline);
  }

  decline() {
    this.dayoffservice.declinedayoff(this.dayoffToDecline).subscribe(result => {
      this.dayoffUpdated = true;
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
      this.dateDayoff = this.selected.split("-", 2)
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

  // public tasksbyDayoff(dayoff:Dayoff){
  //   this.selectedDayoff=dayoff.id;
  //   console.log('selected dayoff',this.selectedDayoff)
  //   this.router.navigate(['/p/tasks/list', dayoff.id]);
  // } 
  

  // getDayoffById(dayoffId: number) {
  //   this.dayoffservice.getDayoffById(dayoffId).subscribe(
  //     (data) => {
  //       this.dayoff = data; // Store the retrieved dayoff entity
  //     },
  //     (error) => {
  //       console.error("Error fetching dayoff: ", error);
  //     }
  //   );}
}
