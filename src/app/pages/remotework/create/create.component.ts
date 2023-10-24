import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RemoteworkService } from 'src/app/core/services/remotework.service';
import { Remotework } from '../remotework.model';
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
  userid;
  dateRemotework: any;
  public addRemotework = new Remotework();
  dataproj:any;
  constructor(private calendar: NgbCalendar, private remoteworkService: RemoteworkService,
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
    this.breadCrumbItems = [{ label: 'Remoteworks' }, { label: 'Create New', active: true }];
    this.selected = '';
    this.hidden = true;
    this.submitted = false
    this.formCreate = this.formBuilder.group({
      remotework_name: ['', Validators.required,],
      remotework_position: ['', Validators.required,],
      remotework_nbdays:['', Validators.required,],
      remotework_motif:['', Validators.required,],
      // assigned_to: ['', Validators.required,],
      // remotework_description: ['', Validators.required],
      selected: ['', Validators.required],
      remotework_days: [''],
      remoteworkplanday:[''], 
      remoteworkplantask:[''], 
      remoteworkplanstatus:[''], 
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
    // let assigned_user = [];
    // this.f.assigned_to.value.forEach(element => {
    //   assigned_user.push(element.id);
    // });
    let remoteworkplan = {
      'date':this.f.remoteworkplanday.value,
      'task':this.f.remoteworkplantask.value,
      'status':this.f.remoteworkplanstatus.value,
    }
    let remoteworkData = {
      'name': this.authServ.getUserFromLocalCache().firstname+' '+this.authServ.getUserFromLocalCache().lastname,
      'position': this.f.remotework_position.value,
      'nbdays': this.f.remotework_nbdays.value,
      'createdate': new Date(),
      'motif': this.f.remotework_motif.value,
      'creator': this.loggedUser,
      'status': "INPROGRESS",
      'remotework_plans':remoteworkplan,
    }
    this.dataproj=remoteworkData
    this.fixingCode(this.dataproj)
    if (this.formCreate.invalid) {
      return;
    }
    if (!this.formCreate.invalid) {
      console.log("remoteworkData", remoteworkData)
      this.remoteworkService.create(this.addRemotework).subscribe(
        data => {
          console.log("data", data)
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['p/remotework/list']);
          }
        },
        error => {
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
      this.dateRemotework = this.selected.split("-",2)
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
  fixingCode(newRemotework:Remotework){
    /**** form.value ******/
    this.addRemotework.name=newRemotework.name;
    this.addRemotework.position=newRemotework.position;
    this.addRemotework.nbdays=newRemotework.nbdays;
    // this.addRemotework.createdate=newRemotework.createdate;
    // this.addRemotework.startdate=newRemotework.startdate;
    // this.addRemotework.returndate=newRemotework.returndate;
    this.addRemotework.creator=newRemotework.creator;
    this.addRemotework.motif=newRemotework.motif;
    this.addRemotework.status=newRemotework.status;
    const plansArray = Array.isArray(newRemotework.remotework_plans) ? newRemotework.remotework_plans : [];


    // Process the remotework_plans array
    // if (newRemotework.remotework_plans && newRemotework.remotework_plans.length > 0) {
    // // Assuming RemoteworkPlan is a type representing the structure of a plan
    // // const processedPlans: RemoteworkPlan[] = [];
    // const processedPlans = newRemotework.remotework_plans.map(plan => ({
    //   date: plan.date,
    //   task: plan.task,
    //   status: plan.status,
    // }));


    // for (const plan of newRemotework.remotework_plans) {
    //   // Modify this section based on the structure of your RemoteworkPlan
    //   // const processedPlan: RemoteworkPlan = {
    //   //   date: '', // Initialize date property
    //   //   task: '', // Initialize task property
    //   //   status: '', // Initialize status property
    //   // };
    //   console.log(newRemotework)

    //   const processedPlan = newRemotework.remotework_plans.map(plan => ({
    //     date: '',
    //     task: '',
    //     status: '',
    //   }));
    //   // Copy properties from plan object
    //   processedPlan.date = plan.date; // Assuming date is in the correct format
    //   processedPlan.task = plan.task;
    //   processedPlan.status = plan.status;

    //   processedPlans.push(processedPlan);
    // }

    // Assign the processed plans back to addRemotework.remotework_plans
    // this.addRemotework.remotework_plans = processedPlans;
    // }
    if (Array.isArray(newRemotework.remotework_plans)) {
    this.addRemotework.remotework_plans = newRemotework.remotework_plans.map(plan => ({
      date: plan.date,
      task: plan.task,
      status: plan.status,
    }));
  }
  

    
    /********date *******/
    let d1,d2;
    d1=this.dateRemotework[0];
    d2=this.dateRemotework[1];
    console.log(d1, d2 )
    let date1 =d1.split("/",3) //[19 ,10, 2022 ]
    let date2 =d2.split("/",3)
   
    d1 = date1[1] +"/" + date1[0]  +"/" + date1[2]
    d2 = date2[1] +"/" + date2[0]  +"/" + date2[2]
    let start=formatDate(d1,'yyyy-MM-dd','en_US')
    let end=formatDate(d2,'yyyy-MM-dd','en_US')
    this.addRemotework.startdate=start;
    this.addRemotework.returndate=end;
    this.addRemotework.createdate=formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

    // this.addRemotework.remotework_plans=newRemotework.remotework_plans;
    // this.addRemotework.remotework_plans.date=remoteworkplandate;
    console.log('after fixing dates')
    console.log(this.addRemotework)



  }

  public list: number[]= [];

 nbr_days :number;

 change:boolean=false;


  onChange(value: any) {
    /*  this.nbr_days = value.target.value; */
    this.change=true;
    this.list=[];
     for (let i = 0; i < this.nbr_days ; i++) {
      console.log ("Block statement execution no." + i);
      this.list.push(this.nbr_days);
      console.log(this.list);
    }
  }
}