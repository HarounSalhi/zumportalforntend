import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dayoff } from 'src/app/pages/day-off/day-off.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayoffService {
  public host=environment.apiUrl;

  constructor(private http:HttpClient) { }


  create(dayoff : Dayoff){
    return this.http.post(`${this.host}/dayoff/add-dayoff/`, dayoff);
}

updatedayoff(dayoff):Observable<any>{
  return this.http.put(`${this.host}/dayoff/update-dayoff/`+ dayoff.id, dayoff);
}

approuvedayoff(dayoff){
  return this.http.put(`${this.host}/dayoff/approuve-dayoff/`+ dayoff.id, dayoff);
}

declinedayoff(dayoff){
  return this.http.put(`${this.host}/dayoff/decline-dayoff/`+ dayoff.id, dayoff);
}

deleteDayoffs(id){
  console.log("service", id)
  return this.http.delete(`${this.host}/dayoff/delete-dayoff/`+ id);
}

getAll():Observable<any>{
  return this.http.get(`${this.host}/dayoff/list-dayoff/`);
}
  /*****/

public listDayoff():Observable<Dayoff[]>{
    return this.http.get<Dayoff[]>(`${this.host}/dayoff/listdayoff/`);
}


//n'afficher pas la liste d'affected to 
public listDayoffByCreator(id:string):Observable<Dayoff[]>{
  return this.http.get<Dayoff[]>(`${this.host}/dayoff/GetDayoffByCreator/${id}`);
}

public getDayoffById(id:number):Observable<Dayoff>{
  return this.http.get<Dayoff>(`${this.host}/dayoff/getdayoff/${id}`);
}
public listDayoffByAffectedTo(id:number):Observable<Dayoff[]>{
  return this.http.get<Dayoff[]>(`${this.host}/dayoff/GetDayoffByUser/${id}`);
}
public getListDayoffByUser(userId):Observable<any> {
  return this.http.get(`${this.host}/dayoff/GetDayoffByUser/` + userId);
  }
/// modifier any par model dayoff 
public adddayoffsToLocalCache(dayoffs:any[]):void{
  localStorage.setItem('dayoffs',JSON.stringify(dayoffs));
  }

public getDayoffsFromLocalCache():any[]{
    return  JSON.parse( localStorage.getItem('dayoffs')); }

}
