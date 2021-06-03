import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { battery } from '../data/data';

/* export const Battery = {
  percentage:50;
  status: string,
  pluggedIn: boolean
} */

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) { }

  getUserDetails(){
    return this.http.get('http://localhost:3000/appRoutes'); 
  }

  updateDashboardParameters(params){
    return this.http.put(`http://localhost:3000/appRoutes/update/${params._id}`,params)
  }

  //get by id
  getDashboardById(_id){
    return this.http.get(`http://localhost:3000/appRoutes/${_id}`)
  }
}