import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  private baseURL = 'http://127.0.0.1:8000/rm';
  


//   getAllData(): Observable<any> {
//     return this.http.get(`${this.baseURL}/rooms`)
//  }

// 
getAllData(): Observable<any> {
  return this.http.get<any[]>(this.baseURL+'/rooms/');
}
private _refreshrequired = new Subject<void>();

get Refreshrequired() {
  return this._refreshrequired;
}
postData(data: any): Observable<any> {
  return this.http.post(this.baseURL+'/requestrooms/', data)
}
updateDispo(data: any): Observable<any> {
  return this.http.patch(this.baseURL+'/rooms2/', data).pipe(   tap(() => {
    this.Refreshrequired.next();

  }));
}
updateNotDispo(data: any): Observable<any> {
  return this.http.patch(this.baseURL+'/rooms/', data).pipe(   tap(() => {
    this.Refreshrequired.next();

  }));
}




 
}
