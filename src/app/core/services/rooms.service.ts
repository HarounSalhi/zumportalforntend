import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }
  private baseURL = 'http://127.0.0.1:8000/rm';

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + '/requestrooms/').pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
  


  updateData(data: any): Observable<any> {
    return this.http.patch(this.baseURL+'/requestrooms/', data).pipe(   tap(() => {
      this.Refreshrequired.next();
  
    }));
}

deleteData(data: any): Observable<any> {
  const options = {
    body: data
  };
  

  return this.http.delete<any>(this.baseURL+'/requestrooms/', options).pipe(   tap(() => {
    this.Refreshrequired.next();

  }));
  
}
private _refreshrequired = new Subject<void>();

get Refreshrequired() {
  return this._refreshrequired;
}


updateData2(data: any): Observable<any> {
  return this.http.patch(this.baseURL+'/rooms2/', data).pipe(   tap(() => {
    this.Refreshrequired.next();

  }));
}
updateData3(data: any): Observable<any> {
  return this.http.patch(this.baseURL+'/rooms/', data).pipe(   tap(() => {
    this.Refreshrequired.next();

  }));
}


}