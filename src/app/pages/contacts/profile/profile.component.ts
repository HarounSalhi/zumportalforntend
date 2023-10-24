import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  formProfile: FormGroup;
  submitted = false;
  successmsg = false;
  error = "";
  loggedUser;
  breadCrumbItems: Array<{}>;
  profilePicturePreview: string | ArrayBuffer | null = null;

  user = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    tel: "123-456-7890",
    role: "User",
    position: "Software Developer",
    ttamount:0,
    dayoffamount:0,
  };

  constructor(private formBuilder: FormBuilder,private router: Router, private UserProfileService: UserProfileService, private authServ: AuthenticationService)  {}

  ngOnInit() {
    this.loggedUser = this.authServ.getUserFromLocalCache()
    this.formProfile = this.formBuilder.group({
      firstname: [this.loggedUser.firstname, Validators.required],
      lastname: [this.loggedUser.lastname, Validators.required],
      email: [this.loggedUser.email, [Validators.required, Validators.email]],
      tel: [this.loggedUser.tel, Validators.required],
      role: [this.loggedUser.role, Validators.required],
      position: [this.loggedUser.position, Validators.required],
      ttamount: [this.loggedUser.ttamount, ],
      dayoffamount: [this.loggedUser.dayoffamount, ]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.formProfile.controls;
  }

  save() {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.formProfile.invalid) {
      return;
    }

    // Process the form data here (e.g., update user profile)
    // Replace the following code with your actual logic
    let user={
      'firstname':this.f.firstname.value,
      'lastname':this.f.lastname.value,
      'email':this.f.email.value,
      // 'tel':this.f.tel.value,
      // 'position':this.f.position.value,
    }
    this.error = "";

    console.log(user)
    console.log(this.loggedUser)
    this.UserProfileService.updateUser(user,this.loggedUser.id).subscribe(
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
  

  onProfilePictureChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];



      // Read and display the selected image as a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // You can also upload the selected file to your server here
      const formData = new FormData();
      formData.append('photo', file);

      // Send the formData to your Django API endpoint using HttpClient
      this.UserProfileService.uploadProfilePhoto(formData,this.loggedUser.id).subscribe(
        (response) => {
          console.log('Profile photo uploaded successfully.', response);
          // Handle success, e.g., update the user's profile with the new photo URL
        },
        (error) => {
          console.error('Error uploading profile photo:', error);
          // Handle error
        }
      );
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    // Add any additional styling or behavior for dragover event
  }

  onDragLeave(event: any) {
    event.preventDefault();
    // Add any additional styling or behavior for dragleave event
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // Handle the dropped files here
  }

  openFilePicker() {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Trigger a click event on the file input element
    }
  }
}
