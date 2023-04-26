import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

//add and take away when needed/not needed
interface Year {
  value: string;
  viewValue: string;
}

//added 4/21/23 - take away if not needed
export interface Tile{
    cols:number;
    rows:number;
    text:string;

}

@Component({
  selector: 'app-pdp3',
  templateUrl: './pdp3.component.html',
  styleUrls: ['./pdp3.component.css']
})
export class PDP3Component {
  constructor(private api: ApiService){}
  DateCompleted = new Date();
  currentPerformanceEvalId = "";

  setdefaultInputs2(){
    this.EmployeeName = this.api.globalUser;
    this.SupervisorName = this.api.globalUser2;

    this.EmployeeName = '------';
    this.SupervisorName = '------';
    this.Rating1 = '----';
    this.Rating2 = '----';
    this.Rating3 = '----';
    this.Rating4 = '----';
    this.Rating5 = '----';
    this.Feedback1 = '------';
    this.Feedback2 = '------';
    this.Feedback3 = '-------';
    this.Feedback4 = '-------';
    this.Feedback5 = '-------';
  }

  setDefaultInputs(){
    this.EmployeeName = this.api.globalUser;
    this.DateCompleted = new Date ();

    this.EmployeeName = 'default';
    this.SupervisorName = 'default';
    this.Rating1 = '11/10';
    this.Rating2 = '20/10';
    this.Rating3 = '19.5/10';
    this.Rating4 = '0/10';
    this.Rating5 = '0.0/10';
    this.Feedback1 = 'default';
    this.Feedback2 = 'default';
    this.Feedback3 = 'default';
    this.Feedback4 = 'default';
    this.Feedback5 = 'default';

  }

  getPerformanceEval(employeeId: string) {
    this.api.getPerformanceEval(employeeId).subscribe((res:any)=> {
      if (this.currentPerformanceEvalId.length != 0){
        this.currentPerformanceEvalId = res[0].id;
        this.EmployeeName = res[0].EmployeeName;
        this.SupervisorName = res[0].SupervisorName;
        this.Rating1 = res[0].Rating1;
        this.Rating2 = res[0].Rating2;
        this.Rating3 = res[0].Rating3;
        this.Rating4 = res[0].Rating4;
        this.Rating5 = res[0].Rating5;
        this.Feedback1 = res[0].Feedback1;
        this.Feedback2 = res[0].Feedback2;
        this.Feedback3 = res[0].Feedback3;
        this.Feedback4 = res[0].Feedback4;
        this.Feedback5 = res[0].Feedback5;
      }
      else {this.setDefaultInputs(); }
    })
  }
/** 
  getSpecificPerformanceEval(performanceId:string){
    this.api.getSpecificPerformanceEval()
  }
  */

  deletePerformanceEval(id: string){
    this.api.deletePerformanceEval(id).subscribe((res: any)=>{
      alert(res);
      this.setdefaultInputs2();
    })
  }

  title = 'Risen One Company Portal'
 /**
  EmployeeName = this.api.globalUser;
  SupervisorName = this.api.globalUser2;
  Rating1 = this.api.rating1;
  Rating2 = this.api.rating2;
  Rating3 = this.api.rating3;
  Rating4 = this.api.rating4;
  Rating5 = this.api.rating4;
  Feedback1 = this.api.feedback1;
  Feedback2 = this.api.feedback2;
  Feedback3 = this.api.feedback3;
  Feedback4 = this.api.feedback4;
  Feedback5 = this.api.feedback4;
  */

  //ideally what it should display is default text, and should change
  EmployeeName = this.api.globalUser;
  SupervisorName = this.api.globalUser2;
  Rating1 = 'rate goes here.';
  Rating2 = 'rate goes here.';
  Rating3 = 'rate goes here.';
  Rating4 = 'rate goes here.';
  Rating5 = 'rate goes here.';
  Feedback1 = 'feedback goes here.';
  Feedback2 = 'feedback goes here.';
  Feedback3 = 'feedback goes here.';
  Feedback4 = 'feedback goes here.';
  Feedback5 = 'feedback goes here.';

  years: Year[] = [
    {value: '2023', viewValue: '2023'},
    {value: '2022', viewValue: '2022'},
    {value: '2021', viewValue: '2021'},
    {value: '2020', viewValue: '2020'}
  ]


}
