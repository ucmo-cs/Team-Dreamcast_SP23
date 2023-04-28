import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';


interface Year {
  value: string;
  viewValue: string;
}

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-pdp2',
  templateUrl: './pdp2.component.html',
  styleUrls: ['./pdp2.component.css']
})
export class PDP2Component {
  constructor(private api: ApiService) { }

  getAssessmentYears() {
    this.api.getSelfAssessmentYears(this.api.globalUserId).subscribe((res: any) => {
      this.years = [];
      res.sort().reverse();
      for (let i = 0; i < res.length; i++) {
        this.years.push({ value: res[i], viewValue: res[i] });
      }
    })
  }

  saveSelfAssessment() {
    let shouldUpdate = false;
    let compareDate = "";

    if(this.completedDate.value != undefined) { compareDate = this.completedDate.value.getFullYear().toString();}
    
    this.years.forEach(function (value) {
      if (value.viewValue == compareDate) {
        shouldUpdate = true;
      }
    })

    if(!shouldUpdate) {this.createNewAssessment();}
    else {this.updateAssessment();}
  }

  updateAssessment() {
    let newSelfAssessment = {
      employeeName: this.employeeName,
      employeeId: this.api.globalUserId,
      accomplishments: [
        this.accomplishment1,
        this.accomplishment2,
        this.accomplishment3
      ],
      takeaways: this.takeaways,
      obstaclesOvercame: this.obstaclesOvercame,
      improvementAreas: this.improvementAreas,
      supportImprovement: this.supportImprovement,
      milestones: this.milestones,
      hurdles: this.hurdles,
      holdAccountable: this.holdAccountable,
      posotivePerformanceExample: this.posotivePerformanceExample,
      improveExample: this.improveExample,
      mainGoal: this.mainGoal,
      learningGoal: this.learningGoal,
      leadershipTeam: this.leadershipTeam,
      feedback: this.feedback,
      assessmentYear: this.completedDate.value?.getFullYear().toString()
    }

    this.api.updateSelfAssessment(newSelfAssessment, this.currentSelfAssessmentId).subscribe((res: any) => {});

    alert("Updated Self Assessment Successfully!")

    this.setDefaultInputs();
    this.setDefaultInputs();
  }

  createNewAssessment() {
    let newSelfAssessment = {
      employeeName: this.employeeName,
      employeeId: this.api.globalUserId,
      accomplishments: [
        this.accomplishment1,
        this.accomplishment2,
        this.accomplishment3
      ],
      takeaways: this.takeaways,
      obstaclesOvercame: this.obstaclesOvercame,
      improvementAreas: this.improvementAreas,
      supportImprovement: this.supportImprovement,
      milestones: this.milestones,
      hurdles: this.hurdles,
      holdAccountable: this.holdAccountable,
      posotivePerformanceExample: this.posotivePerformanceExample,
      improveExample: this.improveExample,
      mainGoal: this.mainGoal,
      learningGoal: this.learningGoal,
      leadershipTeam: this.leadershipTeam,
      feedback: this.feedback,
      assessmentYear: this.completedDate.value?.getFullYear().toString()
    }

    this.api.saveSelfAssessment(newSelfAssessment).subscribe((res: any) => {});

    alert("Created Self Assessment Successfully!")

    this.setDefaultInputs();
    this.setDefaultInputs();
  }

  createYearValue(year: string) {
    return { value: year, viewValue: year };
  }

  setDefaultInputs() {
    this.employeeName = this.api.globalUser;
    this.completedDate = new FormControl(new Date());

    this.accomplishment1 = 'Accomplishment text goes here.';
    this.accomplishment2 = 'Accomplishment text goes here.';
    this.accomplishment3 = 'Accomplishment text goes here.';
    this.takeaways = "Answer goes here.";
    this.obstaclesOvercame = "Answer goes here.";
    this.improvementAreas = "Answer goes here.";
    this.supportImprovement = "Answer goes here.";
    this.milestones = "Answer goes here.";
    this.hurdles = "Answer goes here.";
    this.holdAccountable = "Answer goes here.";
    this.posotivePerformanceExample = "Answer goes here.";
    this.improveExample = "Answer goes here.";
    this.mainGoal = "Answer goes here.";
    this.learningGoal = "Answer goes here.";
    this.leadershipTeam = "Answer goes here.";
    this.feedback = "Answer goes here.";

    this.selectedYear = "";

    this.getAssessmentYears();
  }

  getASelfAssessment(assessmentYear: string) {
    this.api.getASelfAssessment(this.api.globalUserId, assessmentYear).subscribe((res: any) => {
      if (res.length != 0) {
        this.currentSelfAssessmentId = res[0].id;
        this.employeeName = res[0].employeeName;
        this.accomplishment1 = res[0].accomplishments[0];
        this.accomplishment2 = res[0].accomplishments[1];
        this.accomplishment3 = res[0].accomplishments[2];
        this.takeaways = res[0].takeaways;
        this.obstaclesOvercame = res[0].obstaclesOvercame;
        this.improvementAreas = res[0].improvementAreas;
        this.supportImprovement = res[0].supportImprovement;
        this.milestones = res[0].milestones;
        this.hurdles = res[0].hurdles;
        this.holdAccountable = res[0].holdAccountable;
        this.posotivePerformanceExample = res[0].posotivePerformanceExample;
        this.improveExample = res[0].improveExample;
        this.mainGoal = res[0].mainGoal;
        this.learningGoal = res[0].learningGoal;
        this.leadershipTeam = res[0].leadershipTeam;
        this.feedback = res[0].feedback;
        this.completedDate = new FormControl(new Date(res[0].updatedDate));
      }
      else { this.setDefaultInputs(); }
    })
  }

  deleteSelfAssessment() {
    this.api.deleteSelfAssessment(this.currentSelfAssessmentId).subscribe((res: any) => {
      alert("Item deleted successfully.");
      this.setDefaultInputs();
    })
  }

  ngOnInit() {
    this.getAssessmentYears();
  }


  title = 'Risen One Company Portal';

  // need to get this working on front end selection. Will be equal to the updated date.
  completedDate = new FormControl(new Date());

  // front end team decided not to do any routing so we stuck with this jank.
  currentSelfAssessmentId = "";

  employeeName = this.api.globalUser;
  accomplishment1 = 'Accomplishment text goes here.';
  accomplishment2 = 'Accomplishment text goes here.';
  accomplishment3 = 'Accomplishment text goes here.';
  takeaways = "Answer goes here.";
  obstaclesOvercame = "Answer goes here.";
  improvementAreas = "Answer goes here.";
  supportImprovement = "Answer goes here.";
  milestones = "Answer goes here.";
  hurdles = "Answer goes here.";
  holdAccountable = "Answer goes here.";
  posotivePerformanceExample = "Answer goes here.";
  improveExample = "Answer goes here.";
  mainGoal = "Answer goes here.";
  learningGoal = "Answer goes here.";
  leadershipTeam = "Answer goes here.";
  feedback = "Answer goes here.";

  selectedYear = "";
  easyYears = [];

  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1 },
    { text: 'Two', cols: 1, rows: 1 },
    { text: 'Three', cols: 1, rows: 1 },
    { text: 'Four', cols: 1, rows: 1 },
    { text: 'Five', cols: 1, rows: 1 },
    { text: 'Six', cols: 1, rows: 1 },
    { text: 'Seven', cols: 1, rows: 1 },
    { text: 'Eight', cols: 1, rows: 1 },
    { text: 'Nine', cols: 1, rows: 1 },
    { text: 'Ten', cols: 1, rows: 1 },
    { text: 'Eleven', cols: 1, rows: 1 },
    { text: 'Twelve', cols: 1, rows: 1 },
    { text: 'Thirteen', cols: 1, rows: 1 },
  ];

  years: Year[] = [];
}
