import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Remotework } from 'src/app/pages/remotework/remotework.model';
import { environment } from 'src/environments/environment';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class RemoteworkService {
  public host=environment.apiUrl;

  constructor(private http:HttpClient) { }


  create(remotework : Remotework){
    return this.http.post(`${this.host}/remotework/add-remotework/`, remotework);
}

updateremotework(remotework):Observable<any>{
  return this.http.put(`${this.host}/remotework/update-remotework/`+ remotework.id, remotework);
}

deleteRemoteworks(id){
  console.log("service", id)
  return this.http.delete(`${this.host}/remotework/delete-remotework/`+ id);
}

getAll():Observable<any>{
  return this.http.get(`${this.host}/remotework/list-remotework/`);
}
  /*****/

public listRemotework():Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.host}/remotework/listremotework/`);
}


//n'afficher pas la liste d'affected to 
public listRemoteworkByCreator(id:string):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/remotework/GetRemoteworkByCreator/${id}`);
}

public getRemoteworkById(id:number):Observable<Projet>{
  return this.http.get<Projet>(`${this.host}/remotework/getremotework/${id}`);
}
public listRemoteworkByAffectedTo(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/remotework/GetRemoteworkByUser/${id}`);
}
public getListRemoteworkByUser(userId):Observable<any> {
  return this.http.get(`${this.host}/remotework/GetRemoteworkByUser/` + userId);
  }
/// modifier any par model remotework 
public addremoteworksToLocalCache(remoteworks:any[]):void{
  localStorage.setItem('remoteworks',JSON.stringify(remoteworks));
  }

public getRemoteworksFromLocalCache():any[]{
    return  JSON.parse( localStorage.getItem('remoteworks')); }

}
