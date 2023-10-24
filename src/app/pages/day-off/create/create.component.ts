import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DayoffService } from 'src/app/core/services/dayoff.service';
import { Dayoff } from '../day-off.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  formCreate: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  selectValue: Array<{}>;
  loggedUser;
  username =this.authServ.getUserFromLocalCache().firstname+' '+this.authServ.getUserFromLocalCache().lastname;
  typeValue = ['PERSONAL LEAVE','ANNUAL LEAVE', 'EMMERGENCY LEAVE', 'RECOVERY LEAVE'];
  userid;
  dateDayoff: any;
  public addDayoff = new Dayoff();
  datadayoff:any;
  constructor(private calendar: NgbCalendar, private dayOffService: DayoffService,
    private formBuilder: FormBuilder,private router: Router, private UserProfileService: UserProfileService, private authServ: AuthenticationService) {
  }

  breadCrumbItems: Array<{}>;
  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  selected: any;
  hidden: boolean;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @ViewChild('dp', { static: true }) datePicker: any;


  ngOnInit() {

    this.loggedUser = this.authServ.getUserFromLocalCache().id
    console.log(this.loggedUser)
    this.getallusers();

    this.breadCrumbItems = [{ label: 'Day-offs' }, { label: 'Create New', active: true }];
    this.selected = '';
    this.hidden = true;
    this.submitted = false
    this.formCreate = this.formBuilder.group({
      dayoff_name: ['', Validators.required,],
      dayoff_position:['', Validators.required,],
      dayoff_nbdays:['', Validators.required,],
      dayoff_type:['', Validators.required,],
      Backupperson:['',Validators.required,],
      dayoff_motif:['', Validators.required,],
      selected: ['', Validators.required],
    });

  }
  getallusers() {
    this.UserProfileService.getallusers().subscribe(
      data => {
        let listUser = data;
        this.selectValue = listUser.results;
        console.log("thisresults", this.selectValue)

      })
  }
  get f() {
    return this.formCreate.controls;
  }
  save() {
    this.submitted = true;
    let Backupperson = [];
    // this.f.Backupperson.value.forEach(element => {
    //   Backupperson.push(element.id);
    // });
    let dayoffData = {
      'name': this.authServ.getUserFromLocalCache().firstname+' '+this.authServ.getUserFromLocalCache().lastname,
      // 'created_by': this.loggedUser,
      'position': this.f.dayoff_position.value,
      'nbdays': this.f.dayoff_nbdays.value,
      'type': this.f.dayoff_type.value,
      'createdate': new Date(),
      // 'dateDayoff':this.f.dateDayoff.value,
      // 'startdate': this.f.startdate.value,
      // 'returndate': this.f.returndate.value,
      'backupperson': this.f.Backupperson.value.id,
      'motif': this.f.dayoff_motif.value,
      'creator': this.loggedUser,
      'status': "INPROGRESS",
    }
    this.datadayoff=dayoffData
    this.fixingCode(this.datadayoff)
    // console.log("dayoffData", dayoffData)
    // for (const name in dayoffData) {
    //   if (dayoffData[name].invalid) {
    //       console.log(dayoffData[name])
    //   }
    // }
    if (this.formCreate.invalid) {
      console.log("invalid")
      return;
    }
    if (!this.formCreate.invalid) {
      console.log("valid")
      console.log(this.addDayoff)
      this.dayOffService.create(this.addDayoff).subscribe(
        data => {
          console.log("data", data)
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['p/dayoff/list']);
          }
        },
        error => {
          console.log(error)
          this.error = error ? error : '';
        });
    }
  }
  /**
   * on date selected
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
      this.dateDayoff = this.selected.split("-",2)
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
  fixingCode(newDayoff:Dayoff){
    /**** form.value ******/
    this.addDayoff.name=newDayoff.name;
    this.addDayoff.position=newDayoff.position;
    this.addDayoff.nbdays=newDayoff.nbdays;
    this.addDayoff.type=newDayoff.type;
    // this.addDayoff.createdate=newDayoff.createdate;

    this.addDayoff.creator= newDayoff.creator;
    this.addDayoff.backupperson= newDayoff.backupperson;
    this.addDayoff.motif= newDayoff.motif;
    this.addDayoff.status= newDayoff.status;
    /********date *******/
    let d1,d2,d3;
    d1=this.dateDayoff[0];
    d2=this.dateDayoff[1];
    // d3=newDayoff.createdate.toString();
    console.log(d1, d2, d3 )
    let date1 =d1.split("/",3) //[19 ,10, 2022 ]
    let date2 =d2.split("/",3)
    // let createdate=d3.split("-",3)
    d1 = date1[1] +"/" + date1[0]  +"/" + date1[2]
    d2 = date2[1] +"/" + date2[0]  +"/" + date2[2]
    // d3 = createdate[1] +"/" + createdate[2]  +"/" + createdate[3]
    let start=formatDate(d1,'yyyy-MM-dd','en_US')
    let end=formatDate(d2,'yyyy-MM-dd','en_US')
    // let create=formatDate(d3,'yyyy-MM-dd','en_US')
    this.addDayoff.startdate=start;
    this.addDayoff.returndate=end;
    this.addDayoff.createdate=formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  }
}