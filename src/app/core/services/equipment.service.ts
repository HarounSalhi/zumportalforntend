import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/pages/equipment/equipment.model';
import { environment } from 'src/environments/environment';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  public host=environment.apiUrl;

  constructor(private http:HttpClient) { }


  create(equipment : Equipment){
    return this.http.post(`${this.host}/equipment/add-equipment/`, equipment);
}

updateequipment(equipment):Observable<any>{
  return this.http.put(`${this.host}/equipment/update-equipment/`+ equipment.id, equipment);
}

deleteEquipments(id){
  console.log("service", id)
  return this.http.delete(`${this.host}/equipment/delete-equipment/`+ id);
}

getAll():Observable<any>{
  return this.http.get(`${this.host}/equipment/list-equipment/`);
}
  /*****/

public listEquipment():Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.host}/equipment/listequipment/`);
}


//n'afficher pas la liste d'affected to 
public listEquipmentByCreator(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/equipment/GetEquipmentByCreator/${id}`);
}

public getEquipmentById(id:number):Observable<Projet>{
  return this.http.get<Projet>(`${this.host}/equipment/getequipment/${id}`);
}
public listEquipmentByAffectedTo(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/equipment/GetEquipmentByUser/${id}`);
}
public getListEquipmentByUser(userId):Observable<any> {
  return this.http.get(`${this.host}/equipment/GetEquipmentByUser/` + userId);
  }
/// modifier any par model equipment 
public addequipmentsToLocalCache(equipments:any[]):void{
  localStorage.setItem('equipments',JSON.stringify(equipments));
  }

public getEquipmentsFromLocalCache():any[]{
    return  JSON.parse( localStorage.getItem('equipments')); }

}
