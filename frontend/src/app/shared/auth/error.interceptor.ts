import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
/* 
export const errorCodes = ["E_Devc_007", "E_Auth_01", "E_User_005",
  "E_Org_011", "E_Org_012", "E_Auth_011", "E_Auth_014", "E_Auth_001",
  "E_Ogrp_013", "E_Auth_016", "E_rule_009"]; */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.error}`;
          } else {
            this.spinner.hide();
            // server-side error
            //errorMessage = `Error Code: ${error.error?.errorCode}\nMessage: ${error.error?.message}`;
            
              console.error(error.error?.error);
          }
          return throwError(error.error?.error);
        })
      )
  }
}