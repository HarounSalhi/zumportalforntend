import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/core/services/service.service';
import { ManagerRoomsComponent } from './manager-rooms.component';
import { DatePipe } from '@angular/common';
import { RoomsService } from 'src/app/core/services/rooms.service'; 
import { $$ } from 'protractor';
import { listData } from '../../invoices/list/data';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'] ,
  providers: [DatePipe]
  
})
export class RoomsListComponent implements OnInit {
  rooms: any = []; //teb3a e roomsEmployees
  ListRooms : any =[] ; //teb3a e roomsManager
  myDate = new Date();
  now:number;
  newRequest: any = {
    name: '',
    date: '',
    start_hour: '',
    finish_hour: '',
    description: ''
  };
  closeResult: string = '';
  title = 'appBootstrap';
  
  name: string ="";
  sth: string ="";
  fth: string ="";
  // registerForm: FormGroup;
  submitted = false;
  visible = true;
  

  constructor(private http: HttpClient , private modalService: NgbModal , private service: ServiceService ,public datePipe: DatePipe , private ManagerService:RoomsService ) { //this.datePipe.transform(this.myDate,  'yyyy-MM-ddTHH:mm:ssZ', 'UTC');
  
}
 
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  
 
  
  

  // ngOnInit(): void {
  //    // Appelez votre API Django pour récupérer les données des chambres
    
  //    this.http.get<any[]>('http://127.0.0.1:8000/rm/rooms/').subscribe(
  //     (data) => {
  //       this.rooms = data;
  //       console.log(this.rooms)
  //     },
  //     (error) => {
  //       console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
  //     }
  //   );
  ngOnInit(): void {
    
    this.service.getAllData().subscribe(
      (data) => {
        this.rooms = data;
        console.log(this.rooms);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
      }
    );
    console.log (this.disponibility())
    
  
  

     //Add User form validations
    //  this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required]],
    //   });
    // }
  }
  


  
  submitForm2() {
    console.log("------")
    const formData = {
      name: document.getElementById("name").textContent,
      date: this.newRequest.date,
      start_hour: this.newRequest.start_hour,
      finish_hour: this.newRequest.finish_hour,
      description: this.newRequest.description
    };
  
    this.service.postData(formData).subscribe(
      (response) => {
        console.log('Demande enregistrée avec succès', response);
        // Réinitialisez les valeurs du formulaire après l'envoi
        this.newRequest = {
          name: '',
          date: '',
          start_hour: '',
          finish_hour: '',
          description: ''
        };
        console.log(this.newRequest);
        this.modalService.dismissAll();
      },
      
      (error) => {
        console.error('Une erreur s\'est produite', error);
      }
    );
  }
  // update() {
  //   return this.manager.ngOnInit2()
  // }
 disponibility() {
 
this.ManagerService.getAllData().subscribe(
    (data) => {
      this.ListRooms = data;
      
       // Parcours du tableau ManagerRooms
     
      
        // Parcours du tableau rooms
        for (const j of this.rooms) {
          const updatedRoom = {
            id: j.id, 
            
          };
          j.dispo = 0;
          this.service.updateDispo(updatedRoom).subscribe(
            (response) => {
              console.log('Chambre mise à jour avec succès', response);
              // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
      
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
            }
          );
          for (const i of this.ListRooms) {
          if (i.etat === 0)   
            if (j.name === i.name) {
              const iDate = new Date(i.date); 
              const startHourParts = i.start_hour.split(":"); // Split the start_hour string
              const finishHourParts = i.finish_hour.split(":");
              const startHour = parseInt(startHourParts[0], 10); // Convert the hours part to an integer
              const startMinutes = parseInt(startHourParts[1], 10); // Convert the minutes part to an integer
              const finishHour = parseInt(finishHourParts[0], 10); // Convert the hours part to an integer
              const finishMinutes = parseInt(finishHourParts[1], 10); // Convert the minutes part to an integer
 
               if (
                    iDate.getMonth() == this.myDate.getMonth() &&
                    iDate.getFullYear() == this.myDate.getFullYear()&&
                    iDate.getDate() == this.myDate.getDate()  
               )  
              
               
               
               {
                  if(finishHour >= this.myDate.getHours() && startHour <= this.myDate.getHours()) {
                  
                    if(startMinutes >= this.myDate.getMinutes() && startHour ==this.myDate.getHours()) 
                    {
                      const updatedRoom = {
                        id: j.id, 
                        
                      };
                      j.dispo = 0;
                      this.service.updateDispo(updatedRoom).subscribe(
                        (response) => {
                          console.log('Chambre mise à jour avec succès', response);
                          // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
                  
                        },
                        (error) => {
                          console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
                        }
                      );
                   //dispo
                   console.log(" dispo ");
                    
                    }
                    
                    else if( finishMinutes >=this.myDate.getMinutes() && finishHour >= this.myDate.getHours())
                    {
                      const updatedRoom = {
                        id: j.id, 
                        
                      };
                      console.log(this.myDate);
                      console.log(i.date);
                      j.dispo = 1;
                      j.notAvailableUntil = i.finish_hour;
                      this.service.updateNotDispo(updatedRoom).subscribe(
                        (response) => {
                          console.log('Chambre mise à jour avec succès', response);
                          // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
                  
                        },
                        (error) => {
                          console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
                        }
                      );
                      console.log("mihech dispo ");
                      break;
                      //mihech dispo
                    }
                    else if ( finishMinutes <=this.myDate.getMinutes() && finishHour > this.myDate.getHours())
                    {
                      const updatedRoom = {
                        id: j.id, 
                        
                      };
                      console.log(this.myDate);
                      console.log(i.date);
                      j.dispo = 1;
                      j.notAvailableUntil = i.finish_hour;
                      this.service.updateNotDispo(updatedRoom).subscribe(
                        (response) => {
                          console.log('Chambre mise à jour avec succès', response);
                          // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
                  
                        },
                        (error) => {
                          console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
                        });
                       //mihech dispo
                       console.log("mihech dispo likhra");
                       break;
                    }
                    else{
                      const updatedRoom = {
                        id: j.id, 
                        
                      };
                      j.dispo = 0;
                      this.service.updateDispo(updatedRoom).subscribe(
                        (response) => {
                          console.log('Chambre mise à jour avec succès', response);
                          // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
                  
                        },
                        (error) => {
                          console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
                        }
                      );
                     // dispoo
                     console.log("elseee ");
                    }
                   
                   

                  }
                  else{
                    console.log("elseee likhraaaaa");
                    const updatedRoom = {
                      id: j.id, 
                      
                    };
                    j.dispo = 0;
                    this.service.updateDispo(updatedRoom).subscribe(
                      (response) => {
                        console.log('Chambre mise à jour avec succès', response);
                        // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
                
                      },
                      (error) => {
                        console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
                      }
                    );
                    //dispooooo dimaa
                  }
              }
              
                
              
             
             

            }
          
          
          

      
    }}})
       
    
         
      }


      // submitForm() {
      //   const formData = {
      //     name: this.newRequest.name, // Use the form binding instead of DOM manipulation
      //     date: this.newRequest.date,
      //     start_hour: this.newRequest.start_hour,
      //     finish_hour: this.newRequest.finish_hour,
      //     description: this.newRequest.description,
      //   };
      
      //   const dateSelected = new Date(formData.date);
      //   this.ManagerService.getAllData().subscribe(
      //     (data) => {
      //       this.ListRooms = data;
      
      //   for (const room of this.ListRooms) {
      //     if (room.etat === 0) {
      //       const roomDate = new Date(room.date);
      //       const roomStartHour = new Date(roomDate).setHours(
      //         parseInt(room.start_hour.split(':')[0], 10),
      //         parseInt(room.start_hour.split(':')[1], 10)
      //       );
      //       const roomFinishHour = new Date(roomDate).setHours(
      //         parseInt(room.finish_hour.split(':')[0], 10),
      //         parseInt(room.finish_hour.split(':')[1], 10)
      //       );
      
      //       if (
      //         roomDate.getMonth() === dateSelected.getMonth() &&
      //         roomDate.getFullYear() === dateSelected.getFullYear() &&
      //         roomDate.getDate() === dateSelected.getDate() &&
      //         room.name === this.newRequest.name
      //       ) {
      //         if (
      //           roomFinishHour >= dateSelected.getHours() &&
      //           roomStartHour <= dateSelected.getHours()
      //         ) {
      //           if (
      //             (roomStartHour === dateSelected.setMinutes(0, 0) &&
      //               roomStartHour >= dateSelected.setMinutes(0, 0)) ||
      //             (roomFinishHour === dateSelected.setMinutes(0, 0) &&
      //               roomFinishHour >= dateSelected.setMinutes(0, 0)) ||
      //             roomFinishHour > dateSelected.setMinutes(0, 0)
      //           ) {
      //             // Show a warning message
      //             alert('Warning: Room is not available at this time.');
      //             return;
      //           }
      //         }
      //       }
      //     }
      //   }
      
      //   // If no conflicts found, submit the form
      //   this.service.postData(formData).subscribe(
      //     (response) => {
      //       console.log('Demande enregistrée avec succès', response);
      //       // Réinitialisez les valeurs du formulaire après l'envoi
      //       this.newRequest = {
      //         name: '',
      //         date: '',
      //         start_hour: '',
      //         finish_hour: '',
      //         description: '',
      //       };
      //       console.log(this.newRequest);
      //       this.modalService.dismissAll();
      //     },
      //     (error) => {
      //       console.error('Une erreur s\'est produite', error);
      //     }
      //   );
      // } )}
      



 

     
      
      



        
      submitForm() {
        const formData = {
          name: document.getElementById("name").textContent,
          date: this.newRequest.date,
          start_hour: this.newRequest.start_hour,
          finish_hour: this.newRequest.finish_hour,
          description: this.newRequest.description
        };
        this.ManagerService.getAllData().subscribe(
              (data) => {
                 this.ListRooms = data;
      
        const dateSelected = new Date(formData.date);
      
        // for (const room of this.ListRooms) {
        //   if (room.etat === 0) {
        //     const roomDate = new Date(room.date);
        //     const roomStartHour = new Date(roomDate);
        //     roomStartHour.setHours(
        //       parseInt(room.start_hour.split(':')[0], 10),
        //       parseInt(room.start_hour.split(':')[1], 10)
        //     );
        //     const roomFinishHour = new Date(roomDate);
        //     roomFinishHour.setHours(
        //       parseInt(room.finish_hour.split(':')[0], 10),
        //       parseInt(room.finish_hour.split(':')[1], 10)
        //     );
      
        //     if (
        //       roomDate.getMonth() === dateSelected.getMonth() &&
        //       roomDate.getFullYear() === dateSelected.getFullYear() &&
        //       roomDate.getDate() === dateSelected.getDate() &&
        //       room.name === formData.name
        //     ) {
        //       if (
        //         roomFinishHour >= dateSelected &&
        //         roomStartHour <= dateSelected
        //       ) {
        //         if (
        //           (roomStartHour.getHours() === dateSelected.getHours() &&
        //             roomStartHour.getMinutes() >= dateSelected.getMinutes()) ||
        //           (roomFinishHour.getHours() === dateSelected.getHours() &&
        //             roomFinishHour.getMinutes() >= dateSelected.getMinutes()) ||
        //           roomFinishHour.getHours() > dateSelected.getHours()
        //         ) {
        //           // Show a warning message
        //           alert('Warning: Room is not available at this time.');
        //           return;
        //         }
        //       }
        //     }
        //   }
        // }


        for (const room of this.ListRooms) {
          if (room.name == formData.name) {

            const roomDate = new Date(room.date);
            const startHourParts = room.start_hour.split(":"); // Split the start_hour string
              const finishHourParts = room.finish_hour.split(":");
              const startHour = parseInt(startHourParts[0], 10); // Convert the hours part to an integer
              const startMinutes = parseInt(startHourParts[1], 10); // Convert the minutes part to an integer
              const finishHour = parseInt(finishHourParts[0], 10); // Convert the hours part to an integer
              const finishMinutes = parseInt(finishHourParts[1], 10); // Convert the minutes part to an integer

              if (
                roomDate.getMonth() == formData.date.getMonth() &&
                roomDate.getFullYear() ==formData.date.getFullYear()&&
                roomDate.getDate() == formData.date.getDate()  
           ) {

            if(finishHour >= formData.date.getHours() && startHour <= formData.date.getHours()) {
              

            }



           } 

          }

        }
      
        // If no conflicts found, submit the form
        this.service.postData(formData).subscribe(
          (response) => {
            console.log('Demande enregistrée avec succès', response);
            // Réinitialisez les valeurs du formulaire après l'envoi
            this.newRequest = {
              name: '',
              date: '',
              start_hour: '',
              finish_hour: '',
              description: ''
            };
            console.log(this.newRequest);
            this.modalService.dismissAll();
          },
          (error) => {
            console.error('Une erreur s\'est produite', error);
          }
        );
      })}
      


  
    
  
  
}