import { Data } from './components/data';
import { Request } from '../shared/request';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly API = `${environment.API}chart1/`;

  constructor(private http: HttpClient) { }

  /** Método responsável por listar os registros da tabela s_pessoa
   * @author Jonatas ChartsRoutingModule
   * @version 1.0.0
   */

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

  // HttpClient API get() method => Fetch employees list
  getData(): Observable<Data> {
    return this.http.get<Data>(this.API)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
