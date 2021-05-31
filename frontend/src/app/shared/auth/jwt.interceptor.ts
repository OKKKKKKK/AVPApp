import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        console.log(currentUser);
        if (currentUser && currentUser.authorizationToken) {
            request = request.clone({
                setHeaders: {
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `BEARER ${currentUser.authorizationToken}`
                }
            });
        }

        return next.handle(request);
    }
}