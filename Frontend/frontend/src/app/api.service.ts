//created using ng g s api and imports environment
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //creates two private vars, one which is a baseline url and one which connects to the backend and straight to the table we need.
  private baseUrl = environment.apiUrl;
  private employeeURL = this.baseUrl + "/employees";
  private selfAssessmentURL = this.baseUrl + "/self-assessment";
  private personalDevelopmentURL = this.baseUrl + "/personal-development-plan";

//this constructor is to call the httpClient
  constructor(private http: HttpClient) { }
//this is the function to get said url basically.
  getEmployees() {
    return this.http.get<any>(this.employeeURL);
  }

  getAllSelfAssessments() {
    return this.http.get<any>(this.selfAssessmentURL);
  }

  getASelfAssessment(employeeId:string, assessmentYear:string) {
    return this.http.get<any>(this.selfAssessmentURL + "/" + employeeId + "/" + assessmentYear);
  }

  ////////

  deletePersonalDevelopment(personalDevelopmentId:string) {
    return this.http.delete<any>(this.personalDevelopmentURL + "/" + personalDevelopmentId);
  }

  getAPersonalDevelopment(planId:string) {
    return this.http.get<any>(this.selfAssessmentURL + "/" + planId);
  }


  globalUser = 'First McLast';
  globalUserId = '72858bf0-df17-11ed-828b-ed6fee87d3fd';
}