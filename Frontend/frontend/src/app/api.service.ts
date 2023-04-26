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
  private performanceEvalURL = this.baseUrl + "/manager-assessment";


//this constructor is to call the httpClient
  constructor(private http: HttpClient) { }
//this is the function to get said url basically.
  getEmployees() {
    return this.http.get<any>(this.employeeURL);
  }

  getAllSelfAssessments() {
    return this.http.get<any>(this.selfAssessmentURL);
  }

  getASelfAssessments(assessmentId:string) {
    return this.http.get<any>(this.selfAssessmentURL + "/" + assessmentId);
  }

  //created function for performance evaluation

  getPerformanceEval(employeeId:string){
    return this.http.get<any>(this.performanceEvalURL + "/" + employeeId);

  }

  deletePerformanceEval(performanceId:string){
    return this.http.delete<any>(this.performanceEvalURL + "/" + performanceId);

  }
  //ask about global users
  globalUser = 'First McLast';
  globalUserId = '72858bf0-df17-11ed-828b-ed6fee87d3fd'

  globalUser2 = 'Girly Teengirl';
  globalUserId2 = '72858bf0-df17-11ed-828b-ed6fee87c4dd'

  //hardcode this shit in I guess
  //Section Communucation
  rating1 = "5/10";
  feedback1 = "bad";

  //section collab and teamwork
  rating2 = "5/10";
  feedback2 = "even more bad";

  //section quality and accuracy of work
  rating3 = "6/10";
  feedback3 = "just a smidge better";

  //section attendance punctuality and reliability
  rating4 = "7/10";
  feedback4 = "getting warmer...";

  //section goal accomplishment and deadline timeline
  rating  = "10/10";
  feedback5 = "hot as lava!!!! :volcano emoji:";

}