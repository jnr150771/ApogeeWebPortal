import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  sendRegistrationData(firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string,
    employeeNumber: string,
    ): Observable<any>{

      const registrationData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        employeeNumber: employeeNumber,
        
      }
      
      return this.http.post<any>(this.url, registrationData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
