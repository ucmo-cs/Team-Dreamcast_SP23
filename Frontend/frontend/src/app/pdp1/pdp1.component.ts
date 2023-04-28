import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

interface Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pdp1',
  templateUrl: './pdp1.component.html',
  styleUrls: ['./pdp1.component.css']
})


export class PDP1Component {
  constructor(private api: ApiService) { }

  setDefaultInputs() {
    this.currentDate = new Date().getFullYear();
    this.currentPersonalDevelopmentPlanId = "";

    this.employeeName = this.api.globalUser;
    this.filerName = '';
    this.dateCompleted = new FormControl(new Date().getFullYear());
    this.sixMonthCheck = new Date(); // Make 3 months later than above value
    this.shortTermGoals = 'Goal text goes here.';
    this.midTermGoals = 'Goal text goes here.';
    this.longTermGoals = 'Goal text goes here.';
    this.developmentNeeds = 'Development needs go here';
    this.actionPlan = 'Action plan text goes here';
    this.employeeSignature = '';
    this.supervisorSignature = '';
    this.currentDate = new Date().getFullYear();
  }

  deletePersonalDevelopment(id: string) {
    this.api.deletePersonalDevelopment(this.currentPersonalDevelopmentPlanId).subscribe((res: any) => {
      alert(res);
      this.setDefaultInputs();
    })
  }

  getAPersonalDevelopment(employeeId: string,) {
    this.api.getAPersonalDevelopment(employeeId).subscribe((res: any) => {
      // if (res.length != 0) {
      //   this.currentPersonalDevelopmentPlanId = res[0].id;
      //   this.employeeName = res[0].employeeName;
        
      //   this.filerName = res[0].filerName;
      //   this.dateCompleted = res[0].dateCompleted;
      //   this.sixMonthCheck = res[0].sixMonthCheck;
      //   this.shortTermGoals = res[0].shortTermGoals;
      //   this.midTermGoals = res[0].midTermGoals;
      //   this.longTermGoals = res[0].longTermGoals;
      //   this.developmentNeeds = res[0].developmentNeeds;
      //   this.actionPlan = res[0].actionPlan;
      //   this.employeeSignature = res[0].employeeSignature;
      //   this.supervisorSignature = res[0].supervisorSignature;
      //   this.currentDate = res[0].currentDate;
      // }
      // else { this.setDefaultInputs(); }

      this.setDefaultInputs();
    })
  }

  // Values to appear on PDP1
  currentPersonalDevelopmentPlanId = "";

  employeeName = this.api.globalUser;
  filerName = 'John Doe';
  dateCompleted = new FormControl(new Date().getFullYear());
  tmpCurrentDate = new Date();
  sixMonthCheck = new Date(this.tmpCurrentDate
    .setMonth(this.tmpCurrentDate.getMonth()+3)); // Make 3 months later than above value
  shortTermGoals = 'Goal text goes here.';
  midTermGoals = 'Goal text goes here.';
  longTermGoals = 'Goal text goes here.';
  developmentNeeds = 'Development needs go here';
  actionPlan = 'Action plan text goes here';
  employeeSignature = '';
  supervisorSignature = '';
  currentDate = new Date().getFullYear();

  year = new Date().getFullYear();
  selected = this.year.toString();

  years: Year[] = [
    {value: '2023', viewValue: '2023'},
    {value: '2022', viewValue: '2022'},
    {value: '2021', viewValue: '2021'},
  ];
 
}