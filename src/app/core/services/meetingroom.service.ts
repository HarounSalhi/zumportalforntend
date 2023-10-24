import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetingroom } from 'src/app/pages/meetingroom/meetingroom.model';
import { environment } from 'src/environments/environment';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class MeetingroomService {
  public host=environment.apiUrl;

  constructor(private http:HttpClient) { }


  create(meetingroom : Meetingroom){
    return this.http.post(`${this.host}/meetingroom/add-meetingroom/`, meetingroom);
}

updatemeetingroom(meetingroom):Observable<any>{
  return this.http.put(`${this.host}/meetingroom/update-meetingroom/`+ meetingroom.id, meetingroom);
}

deleteMeetingrooms(id){
  console.log("service", id)
  return this.http.delete(`${this.host}/meetingroom/delete-meetingroom/`+ id);
}

getAll():Observable<any>{
  return this.http.get(`${this.host}/meetingroom/list-meetingroom/`);
}
  /*****/

public listMeetingroom():Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.host}/meetingroom/listmeetingroom/`);
}


//n'afficher pas la liste d'affected to 
public listMeetingroomByCreator(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/meetingroom/GetMeetingroomByCreator/${id}`);
}

public getMeetingroomById(id:number):Observable<Projet>{
  return this.http.get<Projet>(`${this.host}/meetingroom/getmeetingroom/${id}`);
}
public listMeetingroomByAffectedTo(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/meetingroom/GetMeetingroomByUser/${id}`);
}
public getListMeetingroomByUser(userId):Observable<any> {
  return this.http.get(`${this.host}/meetingroom/GetMeetingroomByUser/` + userId);
  }
/// modifier any par model meetingroom 
public addmeetingroomsToLocalCache(meetingrooms:any[]):void{
  localStorage.setItem('meetingrooms',JSON.stringify(meetingrooms));
  }

public getMeetingroomsFromLocalCache():any[]{
    return  JSON.parse( localStorage.getItem('meetingrooms')); }

}
