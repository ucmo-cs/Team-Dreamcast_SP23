//created using ng g s api and imports environment
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //creates two private vars, one which is a baseline url and one which connects to the backend and straight to the table we need.
  private baseUrl = environment.apiUrl;
  private employeeURL = this.baseUrl + "/employees";
//this constructor is to call the httpClient
  constructor(private http: HttpClient) { }
//this is the function to get said url basically.
  getEmployees() {
    return this.http.get<any>(this.employeeURL);
  }
  createEmployee(){
    return this.http.get<any>(this.employeeURL);
  }
}
