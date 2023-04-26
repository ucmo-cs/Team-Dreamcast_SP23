import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';
import { ApiService } from '../api.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
    this.filerName = 'John Doe';
    this.dateCompleted = new Date().getFullYear();
    this.sixMonthCheck = new Date(); // Make 3 months later than above value
    this.shortTermGoals = 'Goal text goes here.';
    this.midTermGoals = 'Goal text goes here.';
    this.longTermGoals = 'Goal text goes here.';
    this.developmentNeeds = 'Development needs go here';
    this.actionPlan = 'Action plan text goes here';
  }

  deletePersonalDevelopmentPlanAssessment() {
    this.api.deletePersonalDevelopmentPlan(this.currentPersonalDevelopmentPlanId).subscribe((res: any) => {
      alert(res);
      this.setDefaultInputs();
    })
  }

  getAPersonalDevelopmentPlan(employeeId: string, assessmentYear: string) {
    this.api.getAPersonalDevelopmentPlan(employeeId, assessmentYear).subscribe((res: any) => {
      if (res.length != 0) {
        this.currentPersonalDevelopmentPlanId = res[0].id;
        this.employeeName = res[0].employeeName;
        this.filerName = res[0].filerName;
        this.dateCompleted = res[0].dateCompleted;
        this.sixMonthCheck = res[0].sixMonthCheck;
        this.shortTermGoals = res[0].shortTermGoals;
        this.midTermGoals = res[0].midTermGoals;
        this.longTermGoals = res[0].longTermGoals;
        this.developmentNeeds = res[0].developmentNeeds;
        this.actionPlan = res[0].actionPlan;
        this.currentDate = res[0].currentDate;
      }
      else { this.setDefaultInputs(); }
    })
  }

  // Values to appear on PDP1
  currentDate = new Date().getFullYear();
  currentPersonalDevelopmentPlanId = "";

  employeeName = this.api.globalUser;
  filerName = 'John Doe';
  dateCompleted = new Date().getFullYear();
  tmpCurrentDate = new Date();
  sixMonthCheck = new Date(this.tmpCurrentDate
    .setMonth(this.tmpCurrentDate.getMonth()+3)); // Make 3 months later than above value
  shortTermGoals = 'Goal text goes here.';
  midTermGoals = 'Goal text goes here.';
  longTermGoals = 'Goal text goes here.';
  developmentNeeds = 'Development needs go here';
  actionPlan = 'Action plan text goes here';
  
  year = new Date().getFullYear();
  selected = this.year.toString();
  
  years: Year[] = [
    {value: 'year-0', viewValue: '2023'},
    {value: 'year-1', viewValue: '2022'},
    {value: 'year-2', viewValue: '2021'},
  ];
}
