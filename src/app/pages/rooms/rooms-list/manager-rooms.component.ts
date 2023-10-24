import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { DatePipe } from '@angular/common';
import { RoomsListComponent } from 'src/app/pages/rooms/rooms-list/rooms-list.component';
import { ServiceService } from 'src/app/core/services/service.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-manager-rooms',
  templateUrl: './manager-rooms.component.html',
  styleUrls: ['./manager-rooms.component.scss'] ,
  providers: [DatePipe]
})
export class ManagerRoomsComponent implements OnInit {
  rooms2: any[] = [];
  newRequest: any = {
    name: '',
    date: '',
    startHour: '',
    finishHour: '',
    description: ''
  };
  loggedUser;
  closeResult: string;
  myDate = new Date();
  now:number;
  requestrooms: any[] = []; // Remplacez le type par le type approprié
  rooms: any[] = []; // Remplacez le type par le type approprié
  constructor(private http: HttpClient , private modalService: NgbModal , private service: RoomsService ,private datePipe: DatePipe,private authServ: AuthenticationService) {
    this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    setInterval(() => {
      this.now = Date.now();
    }, 1);

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

  submitForm() {
    // Envoi des données de la nouvelle demande au backend Django
    this.http.post('http://127.0.0.1:8000/rm/requestrooms/', this.newRequest).subscribe(
      (response) => {
        // Succès : Faites ce qui est nécessaire (message de succès, redirection, etc.)
        console.log('Demande enregistrée avec succès', response);
        // Réinitialiser le modèle de la nouvelle demande
        this.newRequest = {
          name: '',
          date: '',
          startHour: '',
          finishHour: '',
          description: ''
          
        };
      },
      (error) => {
        // Erreur : Afficher un message d'erreur ou gérer l'erreur
        console.error('Une erreur s\'est produite', error);
      }
    );
  }

  ngOnInit(): void {
    this.loggedUser = this.authServ.getUserFromLocalCache();

    this.service.getAllData().subscribe(
      (data) => {
        this.rooms2 = data;
        console.log(this.rooms2);
        this.service.Refreshrequired.subscribe(respone=>{
          this.service.getAllData()
        });
        console.log('hello')
      }, 
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
      }
    );
    

  }

  updateState(room: any) {
    const updatedRoom = {
      id: room.id, // Assurez-vous d'ajuster la propriété ID en fonction de votre modèle de données
      etat: 0 // Mettez à jour l'attribut etat à 0
    };
  
    
  
    this.service.updateData(updatedRoom).subscribe(
      (response) => {
        console.log('Chambre mise à jour avec succès', response);
        // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici

      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
      }
    );
  }

  updatestate2(room:any) {

    room.etat=0
  }

  deleteroom(id: any) {
    const body = {
      id: id
    };
  
    this.service.deleteData(body).subscribe(
      (response) => {
        console.log('Chambre supprimée avec succès', response);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de la chambre', error);
      }
      
    );
    this.ngOnInit()
  }
  
  ngOnInit2(): void{
   
  
    // Parcours du tableau requestrooms
    this.service.getAllData().subscribe(
      (data) => {
        this.rooms = data;
        console.log(this.rooms);  })
    for (const i of this.rooms2) {
      
      // Parcours du tableau rooms
      for (const j of this.rooms) {
        if (i.etat === 0) {
        if (j.name === i.name) { // Vérifie si les noms correspondent
          if (i.date === this.myDate && i.start_meeting === this.now) {
            j.dispo = 1;
            this.updateState3(j); // Appel de la fonction correcte pour la mise à jour
          } else if (i.date === this.myDate && i.finish_hour < this.now) {
            j.dispo = 0;
            this.updateState4(j); // Appel de la fonction correcte pour la mise à jour
          }
         
        }
      }
    }}
    
  
  }
  
    
  
  
    ngOnInit3(): void {
    
      this.service.getAllData().subscribe(
        (data) => {
          this.rooms = data;
          console.log(this.rooms);
          
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
        }
      );

      }

      updateState3(room: any) {
        const updatedRoom = {
          id: room.id, // Assurez-vous d'ajuster la propriété ID en fonction de votre modèle de données
          etat: 0 // Mettez à jour l'attribut etat à 0
        };
      
        
      
        this.service.updateData3(updatedRoom).subscribe(
          (response) => {
            console.log('Chambre mise à jour avec succès', response);
            // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
    
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
          }
        );
      }

      updateState4(room: any) {
        const updatedRoom = {
          id: room.id, // Assurez-vous d'ajuster la propriété ID en fonction de votre modèle de données
          etat: 0 // Mettez à jour l'attribut etat à 0
        };
      
        
      
        this.service.updateData2(updatedRoom).subscribe(
          (response) => {
            console.log('Chambre mise à jour avec succès', response);
            // Actualisez la liste des chambres ou effectuez toute autre action nécessaire ici
    
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la mise à jour de la chambre', error);
          }
        );
      }

   
  
  
}
