import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, Form } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/auth.models';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Usergrid } from '../usergrid/usergrid.model';
import { Userlist } from './userlist.model';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

/**
 * Contacts user-list component
 */
export class UserlistComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  userGridData: Userlist[];
  userid;


  constructor(private UserProfileService: UserProfileService, private modalService: NgbModal,
    private formBuilder: FormBuilder, private projectService: ProjectService, private authServ: AuthenticationService){ }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users List', active: true }];
    this.getallusers();

  }

  getallusers() {
    this.UserProfileService.getallusers().subscribe(
      data => {
        let listUser = data;
        this.userGridData =data['results'];
        this.userid = this.userGridData;
        // console.log('user*****iddddddddd*********', this.userid);
        //   let userId = [];
        //   this.userid.forEach(element => {
        //     userId.push(element.id);
        // });
        // console.log('userId', userId);
      })
  }
}
