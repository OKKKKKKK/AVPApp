import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(public _firebaseAuth: AngularFireAuth, public router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

    //uncomment above firebase auth code and remove this temp code
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(true);
      }, 1000);
    });

  }

  public get currentUserValue(){
		return this.currentUserSubject.value;
	}

  login(cred){
    return this.http.post('http://localhost:3000/appRoutes/login', cred).pipe(
			map((user) => {
				const currentUser = user;
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('currentUser', JSON.stringify(currentUser));
				this.currentUserSubject.next(currentUser);
				////console.log(currentUser);
        this.isAuthenticated();
				return currentUser;
			})
		);
  }

  logout() {
    localStorage.clear();
		this.currentUserSubject.next(null);
    this.router.navigate([ '/pages/login' ]);
  }

  isAuthenticated() {
    return true;
  }
}
