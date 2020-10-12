import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  /* URL */
  url: any = 'http://localhost:8080/api/rover';

  constructor(public http: HttpClient) { }

  /* post add*/
  add(body): Observable<any> {
    return this.http.post(this.url, body);
  }


  getRover(): Observable<any> {
    return this.http.get(this.url);
  }


  // /* put update */
  // update(path, id, body): Observable<any> {
  //   return this.http.put(this.url + path + id, body);
  // }

  // updateAll(path, body): Observable<any> {
  //   return this.http.put(this.url + path, body);
  // }

  // /* delete */
  // delete(path, id): Observable<any> {
  //   return this.http.delete(this.url + path + id);
  // }

  // /*put*/
  // put(path, id): Observable<any>{
  //   return this.http.put(this.url + path + id, {})
  // }
}
